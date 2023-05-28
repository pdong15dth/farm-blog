import prisma from '@/src/services/basePrisma/BasePrisma';
import CryptoJS from 'crypto-js'

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
