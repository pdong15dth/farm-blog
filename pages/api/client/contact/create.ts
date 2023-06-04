import utils from '@/src/utils/constant'
import prisma from '@/src/services/basePrisma/BasePrisma';

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    console.log(body)
    const result = await prisma.contact.create({
        data: {
            firstName: body?.firstName,
            lastName: body?.lastName,
            phone: body?.phone,
            address: body?.address,
            message: body?.message
        },
    });
    res.json(result);
}
