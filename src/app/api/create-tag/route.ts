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
  try {
    const tag = await prisma.tag.create({
      data: {
        name: body.name,
        userId: body.userId,
      },
    });
    return new Response(JSON.stringify(tag), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Request error', error);
    return new Response(JSON.stringify({ error: "A tag with this name may already exist.", success: false }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
