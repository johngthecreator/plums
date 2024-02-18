import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const newSpace = await prisma.space.create({
      data: {
        name: body.spaceName,
        userId: body.userId,
      },
    });
    return Response.json(newSpace);
  } catch (error) {
    console.error('Request error', error);
    return Response.json({ error: 'Error creating space', success: false });
  }
} 