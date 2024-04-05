import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const tag_id = searchParams.get('tag-id');
  
  try {
    const topics = await prisma.topic.findMany({
      where: {
        tags: {
          some: {
            tag_id: Number(tag_id),
          },
        },
      },
    });

    for (const topic of topics) {
      await prisma.topic.update({
        where: { topic_id: topic.topic_id },
        data: {
          tags: {
            disconnect: [{ tag_id: Number(tag_id) }],
          },
        },
      });
    }

    await prisma.tag.delete({
      where: { tag_id: Number(tag_id) },
    });

    return new Response(JSON.stringify({ message: "Tag successfully disconnected and deleted" }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: "Error deleting tag or disconnecting it from topics", success: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
