import { PrismaClient } from '@prisma/client';
import { RequestHandler } from "express";

const createUser : RequestHandler =  async (req, res, next) =>{
    const userInfo = res.locals.user;
    const prisma = new PrismaClient()

    async function main() {
        const user = await prisma.user.create({
            data: {
                firstname: userInfo.given_name,
                lastname: userInfo.name,
                email: userInfo.email,
            },
          })
          res.json(user);
    }

    main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
}

export default createUser;