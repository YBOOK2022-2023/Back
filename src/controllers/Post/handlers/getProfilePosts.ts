import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

const getProfilePosts: RequestHandler=(req, res, next) => {
    const userEmail: string = res.locals.user.email;
    const prisma = new PrismaClient();

    async function main(){
        const user =await prisma.user.findUnique({
            where:{
                email:userEmail,
            },
            include: {
                posts: true,
                postLikes: true,
                postComment: true,
                fromFriendship: true,
                toFrienship: true,
                blockedUsers :true,
                blockedByUsers:true
                
            }

        })
        if(user){
            const user_Id =user.id;
           
             
            const likedPosts =await prisma.postLike.findMany({
               where: {
                    userId: user_Id,
                },
                include: {
                    post:{
                        include: {
                            user: true,
                            
                            postLikes: true,
                            postComments: true,
                            postAttachments: true,     
                        }
                    },
                    
                }

            });
            const posted =await prisma.post.findMany({
                where: {
                    userId: user_Id,
                },
                include: {
                    user:true,
                    
                    postLikes: true,
                    postComments: true,
                    postAttachments: true,
                    
                }

            })
            const postCommented =await prisma.postComment.findMany({
                where:{
                    userId:user_Id,
                },
                include:{
                    post:{
                        include:{
                        user:true,
                        postLikes: true,
                        postComments: true,
                        postAttachments: true,
                        }
                    }
                }
            })       
            const profilePosts=[];
              profilePosts.push({user:user,posted:posted,likedPost:likedPosts.map(like => like.post),commentedPost:postCommented})  
           res.json(profilePosts);
        }
    }
    main()
    .then(async() => {
        await prisma.$disconnect();
    })
    .catch(async(e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }); 
};

export default getProfilePosts