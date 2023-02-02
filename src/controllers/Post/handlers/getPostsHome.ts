import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { integer } from "aws-sdk/clients/cloudfront";

const getPostsHome: RequestHandler = (req, res, next) => {
  const userEmail: string = res.locals.user.email;

  const prisma = new PrismaClient();

  async function main() {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    if (user) {
      const userId = user.id;
      const postsWithFrienships = await prisma.post.findMany({
        where: {
          user: {
            AND: [
              {
                OR: [
                  {
                    fromFriendship: {
                      some: {
                        OR: [
                          {
                            toId: userId,
                          },
                          {
                            fromId: userId,
                          },
                        ],
                      },
                    },
                  },
                  {
                    toFrienship: {
                      some: {
                        OR: [
                          {
                            toId: userId,
                          },
                          {
                            fromId: userId,
                          },
                        ],
                      },
                    },
                  },
                ],
              },
              {
                id: {
                  not: userId,
                },
              },
            ],
          },
        },
        include: {
          postAttachments: {
            select: {
              s3Key: true,
              type: true,
            },
          },
          user: true,
          postLikes: true,
        },
      });
      const lastPosts = await prisma.post.findMany({
        where: {
          user: {
            NOT: [
              {
                OR: [
                  {
                    fromFriendship: {
                      some: {
                        OR: [
                          {
                            toId: userId,
                          },
                          {
                            fromId: userId,
                          },
                        ],
                      },
                    },
                  },
                  {
                    toFrienship: {
                      some: {
                        OR: [
                          {
                            toId: userId,
                          },
                          {
                            fromId: userId,
                          },
                        ],
                      },
                    },
                  },
                ],
              },
              {
                id: userId,
              },
            ],
          },
        },
        include: {
          postLikes: true,
          postAttachments: {
            select: {
              s3Key: true,
              type: true,
            },
          },
          user: true,
        },
      });

      const allPosts = [];
      allPosts.push(postsWithFrienships);
      allPosts.push(lastPosts);
      res.json(allPosts);
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
};

export default getPostsHome;
