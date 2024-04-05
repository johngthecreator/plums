import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id');
  if (!id) return;
  try {
    const allSpaces = await prisma.topic.findMany({
      where: {
        userId: {
          equals: id,
        }
      }
    });
    return Response.json(allSpaces);
  }catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: 'Error getting spaces. It may not exist or another error occurred.', success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}