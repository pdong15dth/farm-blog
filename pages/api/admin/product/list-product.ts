import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    const result = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json(result);
}
