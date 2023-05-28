import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { email, password } = body;
    var sha256Hash = CryptoJS.SHA256(password);
    console.log(email, password, sha256Hash.toString())
    const result = await prisma.user?.findFirst({
        where: {
            email: email,
            password: sha256Hash.toString()
        }
    })
    console.log("handle res", result)
    res.json(result);
}
