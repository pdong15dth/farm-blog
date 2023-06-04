import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
export default async function handle(req, res) {
    const result = await prisma.contact.findMany();
    res.json(result);
}
