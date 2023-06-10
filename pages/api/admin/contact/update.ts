import prisma from '@/src/services/basePrisma/BasePrisma'
import utils from '@/src/utils/constant'

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.contact.update({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        data: {
            isActive: true,
        }
    }).catch(error => {
        console.log("Loi roi");
        console.log(error);
    });

    console.log("result")
    res.json(result, {});
}
