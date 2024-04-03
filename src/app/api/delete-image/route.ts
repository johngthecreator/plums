import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

  const libsql = createClient({
    url: `${process.env.TURSO_DATABASE_URL}`,
    authToken: `${process.env.TURSO_AUTH_TOKEN}`,
  })
  
  const adapter = new PrismaLibSQL(libsql)
  const prisma = new PrismaClient({ adapter })

// change these to url parameters
export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id');
    if (!id) return;
    try {
      const deletedImage = await prisma.image.delete({
        where: {
          image_id: Number(id), 
        },
      });
      return Response.json({ status: 200, body: deletedImage });
    } catch (error) {
      console.error('Request error', error);
      return Response.json({ status: 500, body: { error: 'Error deleting image. It may not exist or another error occurred.', success: false } });
    }
  }