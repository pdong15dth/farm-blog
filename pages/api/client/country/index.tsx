import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    console.log("", req.query)
    const result = await prisma.country.findMany();
    res.json(result);
}
