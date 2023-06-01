import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {
    const result = await prisma.product.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            finishProduct: true
        }
    });
    res.json(result);
}
