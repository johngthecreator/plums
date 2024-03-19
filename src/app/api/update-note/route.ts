import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })


  export async function POST(req: Request) {
    const body = await req.json();
    try {
      const newNote = await prisma.note.update({
        where: {
            note_id: Number(body.noteId),  // Use note_id from the request to find the note
          },
          data: {
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