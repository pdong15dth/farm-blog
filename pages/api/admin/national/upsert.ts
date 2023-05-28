import prisma from '@/src/services/basePrisma/BasePrisma';
import utils from '@/src/utils/constant'

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.nationalName)
    var slug = b
    const result = await prisma.national.upsert({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        create: {
            nationalName: body.nationalName,
            slug: slug,
        },
        update: {
            nationalName: body.nationalName,
            slug: slug,
        }
    }).catch(error => {
        console.log("Lỗi ở đây này")
        return res.json({
            code: 401,
            message: "Quốc gia đã tồn tại"
        });
    });
    console.log(result)
    res.json(result ?? {
        code: 401,
        message: "Quốc gia đã tồn tại"
    });
}
