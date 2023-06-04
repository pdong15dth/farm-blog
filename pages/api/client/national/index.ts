import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    const result = await prisma.national.findMany({
        where: {
            slug: req.query.slug
        }
    });
    res.json(result);
}
