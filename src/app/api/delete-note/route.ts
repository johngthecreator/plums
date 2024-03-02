import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// change these to url parameters
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) return;
    try {
      const deletedNote = await prisma.note.delete({
        where: {
          note_id: Number(id), 
        },
      });
      return Response.json({ status: 200, body: deletedNote });
    } catch (error) {
      console.error('Request error', error);
      return Response.json({ status: 500, body: { error: 'Error deleting note. It may not exist or another error occurred.', success: false } });
    }
  }