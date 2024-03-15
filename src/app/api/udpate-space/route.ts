import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
const prisma = new PrismaClient({ adapter })

export async function updateSpaceById(spaceId: number, name: string) {
  try {
    const updatedSpace = await prisma.topic.update({
      where: {
        topic_id: spaceId,
      },
      data: {
        name: name,
      },
    });
    return { status: 200, body: updatedSpace };
  } catch (error) {
    console.error('Request error', error);
    return { status: 500, body: { error: 'Error updating space', success: false } };
  }
}
