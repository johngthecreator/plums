// Assuming this file is named `getSpaceByName.ts`

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Function to get a single space by name
export async function getSpaceByName(name: string) {
  try {
    const space = await prisma.space.findFirst({
      where: {
        name: name,
      },
    });
    if (space) {
      return { status: 200, body: space };
    } else {
      return { status: 404, body: { error: 'Space not found', success: false } };
    }
  } catch (error) {
    console.error('Request error', error);
    return { status: 500, body: { error: 'Error getting space by name', success: false } };
  }
}
