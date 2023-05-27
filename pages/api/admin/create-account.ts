import { PrismaClient } from '@prisma/client'
import CryptoJS from 'crypto-js'

const prisma = new PrismaClient()
// POST /api/create-account
export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const { email, name, password, role } = body;
    console.log("handle", email, name)
    var sha256Hash = CryptoJS.SHA256(password);
    const result = await prisma.user.create({
        data: {
            email: email,
            name: name,
            password: sha256Hash.toString(),
            role: role
        }
    })
    res.json(result);
}
