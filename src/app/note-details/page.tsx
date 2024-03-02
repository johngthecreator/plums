import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface Note {
  note_id: number;
  title: string;
  text: string;
  links: Link[];
  parentId?: number;
  children: Note[];
  space_note: {
    user: {
      user_oauth_id: string;
    };
    name: string;
  };
}

interface Link {
  link_id: number;
  link_title: string;
  link_value: string;
  link_desc: string;
}

async function getNoteById(noteId: number): Promise<Note | null> {
  try {
    const note = await prisma.note.findUnique({
      where: { note_id: noteId },
      include: {
        space_note: {
          include: {
            user: true,
          },
        },
        links: true,
        children: true,
      },
    });
    return note;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
}

function renderNoteDetails(note: Note) {
  // User and space information
  const userInfo = `User: ${note.space_note.user.user_oauth_id}`;
  const spaceInfo = `Space: ${note.space_note.name}`;
  const userInfoElement = document.createElement('p');
  userInfoElement.textContent = userInfo;
  const spaceInfoElement = document.createElement('p');
  spaceInfoElement.textContent = spaceInfo;
  document.body.appendChild(userInfoElement);
  document.body.appendChild(spaceInfoElement);

  // Render note title
  const titleElement = document.createElement('h1');
  titleElement.textContent = note.title;
  document.body.appendChild(titleElement);

  // Render note text
  const textElement = document.createElement('p');
  textElement.textContent = note.text;
  document.body.appendChild(textElement);

  // Render links
  if (note.links.length > 0) {
    const linksContainer = document.createElement('div');
    const linksTitle = document.createElement('h2');
    linksTitle.textContent = 'Links';
    linksContainer.appendChild(linksTitle);

    const linksList = document.createElement('ul');
    note.links.forEach(link => {
      const listItem = document.createElement('li');
      const linkTitle = document.createElement('h3');
      linkTitle.textContent = link.link_title;
      listItem.appendChild(linkTitle);
      const linkValue = document.createElement('a');
      linkValue.href = link.link_value;
      linkValue.textContent = link.link_desc;
      listItem.appendChild(linkValue);
      linksList.appendChild(listItem);
    });
    linksContainer.appendChild(linksList);
    document.body.appendChild(linksContainer);
  }

  // Render images (Hopefully)
  const imagesRegex = /(https?:\/\/.*?\.(?:png|jpg|gif|jpeg))/gi;
  const imageMatches = note.text.match(imagesRegex);
  if (imageMatches && imageMatches.length > 0) {
    const imagesContainer = document.createElement('div');
    const imagesTitle = document.createElement('h2');
    imagesTitle.textContent = 'Images';
    imagesContainer.appendChild(imagesTitle);

    imageMatches.forEach(imageUrl => {
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;
      imagesContainer.appendChild(imageElement);
    });
    document.body.appendChild(imagesContainer);
  }
}

async function main() {
  const noteId = 1; // Replace with the ID of the note 
  const note = await getNoteById(noteId);
  if (note) {
    console.log('Note:', note);
    renderNoteDetails(note);
  } else {
    console.log('Note not found.');
  }
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
