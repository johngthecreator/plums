import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id');
  if (!id) return;
  try {
    const allSpaces = await prisma.space.findMany({
      where: {
        userId: {
          equals: id,
        }
      }
    });
    return Response.json(allSpaces);
  } catch (error) {
    console.error('Request error', error);
    return Response.json({ error: 'Error getting spaces', success: false });
  }
}