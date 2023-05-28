import prisma from "@/src/services/basePrisma/BasePrisma";

// POST /api/get-accounts
export default async function handle(req, res) {
    const result = await prisma.country.findMany({
        orderBy: {
            countryName: 'asc'
        }
    });
    res.json(result);
}
