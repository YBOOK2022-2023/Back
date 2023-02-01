import { PrismaClient } from "@prisma/client";
import { RequestHandler } from "express";

//Utilisé pour la récupération des posts d'un utilisateur sur sa page profil
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
            
            const friendshipCount = await prisma.friendship.count({
                where:{
                    AND:[
                        {
                            status: 'ACCEPTED'
                        },
                        {
                           OR:[
                                {
                                    fromId: user.id
                                },
                                {
                                    toId: user.id
                                }
                           ] 
                        }
                    ]
                }
              })      
            const profilePosts=[];
              profilePosts.push({user:user,posted:posted,likedPost:likedPosts.map(like => like.post),commentedPost:postCommented,friendcount:friendshipCount})  
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