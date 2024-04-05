import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const newSpace = await prisma.topic.create({
      data: {
        name: body.spaceName,
        userId: body.userId,
      },
    });
    return Response.json(newSpace);
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: 'Error creating space.', success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 