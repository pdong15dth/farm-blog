import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {
    const result = await prisma.finishProduct.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            comments: true
        }
    });
    res.json(result);
}
