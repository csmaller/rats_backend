import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient()
  .$extends(withAccelerate());

// A `main` function so that we can use async/await
async function main() {

  const user1Email = `alice${Date.now()}@prisma.io`;
  const user2Email = `bob${Date.now()}@prisma.io`;

  // Seed the database with users and posts
  const user1 = await prisma.user.create({
    data: {
      email: user1Email,
      name: 'Alice',
      posts: {
        create: {
          title: 'Join the Prisma community on Discord',
          content: 'https://pris.ly/discord',
          published: true,
        },
      },
    },
    include: {
      posts: true,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      email: user2Email,
      name: 'Bob',
      posts: {
        create: [
          {
            title: 'Check out Prisma on YouTube',
            content: 'https://pris.ly/youtube',
            published: true,
          },
          {
            title: 'Follow Prisma on Twitter',
            content: 'https://twitter.com/prisma/',
            published: false,
          },
        ],
      },
    },
    include: {
      posts: true,
    },
  });
  console.log(
    `Created users: ${user1.name} (${user1.posts.length} post) and ${user2.name} (${user2.posts.length} posts) `,
  );

  // Retrieve all published posts
  const allPosts = await prisma.post.findMany({
    where: { published: true },
  });
  console.log(`Retrieved all published posts: ${JSON.stringify(allPosts)}`);

  // Create a new post (written by an already existing user with email alice@prisma.io)
  const newPost = await prisma.post.create({
    data: {
      title: 'Join the Prisma Discord community',
      content: 'https://pris.ly/discord',
      published: false,
      author: {
        connect: {
          email: user1Email,
        },
      },
    },
  });
  console.log(`Created a new post: ${JSON.stringify(newPost)}`);

  // Publish the new post
  const updatedPost = await prisma.post.update({
    where: {
      id: newPost.id,
    },
    data: {
      published: true,
    },
  });
  console.log(`Published the newly created post: ${JSON.stringify(updatedPost)}`);

  // Retrieve all posts by user with email alice@prisma.io
  const postsByUser = await prisma.post
    .findMany({
      where: {
        author: {
          email: user1Email
        }
      },
    });
  console.log(`Retrieved all posts from a specific user: ${JSON.stringify(postsByUser)}`);

  // Load songs from the local JSON file and insert into the Songs table
  try {
    const songsPath = path.resolve(__dirname, 'songs.json');
    const raw = fs.readFileSync(songsPath, 'utf8');
    const parsed = JSON.parse(raw);
    const songs = Array.isArray(parsed.songs)
      ? (parsed.songs as Array<{ id?: number; title: string; artist: string }>)
      : [];

    if (songs.length > 0) {
      // Map to the model fields we have (omit any explicit id so DB autogenerates it)
      const toInsert = songs.map((s) => ({ title: s.title, artist: s.artist }));

      // Cast to any because Prisma client typings may be out of sync with the generated client in this workspace
      const result = await (prisma as any).songs.createMany({
        data: toInsert,
        skipDuplicates: true,
      });
      console.log(`Inserted ${result.count ?? toInsert.length} songs into the Songs table`);
    } else {
      console.log('No songs found in songs.json to insert.');
    }
  } catch (err) {
    console.error('Failed to load or insert songs from songs.json:', err);
  }

}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
