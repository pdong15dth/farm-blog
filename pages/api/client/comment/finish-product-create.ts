import utils from '@/src/utils/constant'
import prisma from '@/src/services/basePrisma/BasePrisma';

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    console.log(body)
    const result = await prisma.comment.create({
        data: {
            fullName: body?.fullName,
            email: body?.email,
            content: body?.content,
            finishProductId: parseInt(body?.finishProductId),
        },
    });
    res.json(result);
}
