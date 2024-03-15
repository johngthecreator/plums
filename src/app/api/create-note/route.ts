  import { PrismaClient } from '@prisma/client'

  const prisma = new PrismaClient()

  export async function POST(req: Request) {
    const body = await req.json();
    try {
      const newNote = await prisma.note.create({
        data: {
          topicId: body.spaceId,  
          title: body.title,
          text: body.text,
        },
      });
      return Response.json(newNote);
    } catch (error) {
      console.error('Request error', error);
      return Response.json({ error: 'Error creating note', success: false });
    }
  } 