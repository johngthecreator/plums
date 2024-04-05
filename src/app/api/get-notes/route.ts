import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

export async function GET(req:Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) return;
    try {
      const notes = await prisma.note.findMany({
        where: {
            topicId: {
            equals: Number(id),
            }
        },
      });
      if (notes) {
        return Response.json({ status: 200, body: notes });
      } else {
        return Response.json({ status: 404, body: { error: 'Notes not retrieved', success: false } });
      }
    } catch (error) {
      console.error('Request error', error);
      return new Response(JSON.stringify({ error: 'Error getting notes. It may not exist or another error occurred.', success: false }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }
  