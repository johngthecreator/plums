import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function updateSpaceById(spaceId: number, name: string) {
  try {
    const updatedSpace = await prisma.space.update({
      where: {
        space_id: spaceId,
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
