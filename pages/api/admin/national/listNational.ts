import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// POST /api/get-accounts
export default async function handle(req, res) {
    const result = await prisma.national.findMany({
        orderBy: {
            nationalName: 'asc'
        }
    });
    res.json(result);
}
