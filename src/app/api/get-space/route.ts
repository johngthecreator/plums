import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

// Function to get a single space by name
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id');
  if (!id) return;
  try {
    const space = await prisma.topic.findUnique({
      where: {
        topic_id: Number(id),
      },
      include: {
        tags: true,
      }
    });
    if (space) {
      return Response.json({ status: 200, body: space });
    } else {
      return Response.json({ status: 404, body: { error: 'Space not found', success: false } });
    }
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: 'Error getting space. It may not exist or another error occurred.', success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
