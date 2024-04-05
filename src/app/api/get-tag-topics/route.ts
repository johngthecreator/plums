import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const tagId = searchParams.get('tag-id');


  if (!tagId) {
    return new Response(JSON.stringify({ error: 'Tag ID is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const tagWithTopics = await prisma.tag.findUnique({
      where: { tag_id: Number(tagId) },
      include: {
        topics: true,
      },
    });

    if (!tagWithTopics) {
      return new Response(JSON.stringify({ error: 'Tag not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Respond with the topics related to the specified tag
    return new Response(JSON.stringify(tagWithTopics.topics), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: 'Error fetching topics for the tag', success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
