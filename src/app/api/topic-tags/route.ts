import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  const body = await req.json();
  const { topicId, tagIds, action } = body; // `action` can be "attach" or "remove"

  if (!topicId || !Array.isArray(tagIds) || !['attach', 'remove'].includes(action)) {
    return new Response(JSON.stringify({ error: 'Invalid request body', success: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const updatedTopic = await prisma.topic.update({
      where: { topic_id: Number(topicId) },
      data: action === 'attach' ? {
        tags: {
          connect: tagIds.map(tagId => ({ tag_id: Number(tagId) })),
        },
      } : {
        tags: {
          disconnect: tagIds.map(tagId => ({ tag_id: Number(tagId) })),
        },
      },
    });
    return new Response(JSON.stringify(updatedTopic), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: `Error ${action === 'attach' ? 'attaching' : 'removing'} tags to/from topic`, success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
