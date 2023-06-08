import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    console.log("dongne", req.query)
    const national = await prisma.national.findFirst({
        where: {
            slug: req.query.national
        }
    })
    console.log(national)
    const result = await prisma.product.findMany({
        where: {
            published: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json(result);
}
