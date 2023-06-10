import prisma from '@/src/services/basePrisma/BasePrisma';

// POST /api/get-accounts
export default async function handle(req, res) {
    const result = await prisma.post.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            comments: true
        }
    });
    res.json(result);
}
