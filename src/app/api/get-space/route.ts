import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Function to get a single space by name
export async function GET(req:Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id');
  if (!id) return;
  try {
    const space = await prisma.space.findFirst({
      where: {
        space_id: Number(id),
      },
    });
    if (space) {
      return Response.json({ status: 200, body: space });
    } else {
      return Response.json({ status: 404, body: { error: 'Space not found', success: false } });
    }
  } catch (error) {
    console.error('Request error', error);
    return Response.json({ status: 500, body: { error: 'Error getting space by name', success: false } });
  }
}
