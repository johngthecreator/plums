import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const allSpaces = await prisma.space.findMany({
    });
    return Response.json(allSpaces);
  } catch (error) {
    console.error('Request error', error);
    return Response.json({ error: 'Error getting spaces', success: false });
  }
}