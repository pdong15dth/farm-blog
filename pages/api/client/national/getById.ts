import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    console.log("getby id national", req.query)
    const result = await prisma.national.findFirst({
        where: {
            slug: req.query.slug
        }
    });
    console.log(result)
    res.json(result);
}
