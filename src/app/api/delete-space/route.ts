import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// change these to url parameters
export async function deleteSpaceById(spaceId: number) {
    try {
      const deletedSpace = await prisma.space.delete({
        where: {
          space_id: spaceId, 
        },
      });
      return { status: 200, body: deletedSpace };
    } catch (error) {
      console.error('Request error', error);
      return { status: 500, body: { error: 'Error deleting space. It may not exist or another error occurred.', success: false } };
    }
  }