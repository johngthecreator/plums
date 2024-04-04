import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

// Initialize your LibSQL client with your environment variables
const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
});

// Use the LibSQL adapter with your Prisma client
const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const updatedTopic = await prisma.topic.update({
      where: {
        topic_id: Number(body.topicId), // Specify which topic to update using its ID
      },
      data: {
        parentId: Number(body.parentId), // Set the new parentId for the topic
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
    return new Response(JSON.stringify({ error: 'Error updating topic', success: false }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}