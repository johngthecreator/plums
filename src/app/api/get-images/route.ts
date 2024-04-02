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
      const notes = await prisma.image.findMany({
        where: {
            topicId: {
            equals: Number(id),
            }
        },
      });
      if (notes) {
        return Response.json({ status: 200, body: notes });
      } else {
        return Response.json({ status: 404, body: { error: 'Image not retrieved', success: false } });
      }
    } catch (error) {
      console.error('Request error', error);
      return Response.json({ status: 500, body: { error: 'Error getting Images by topicId', success: false } });
    }
  }
  