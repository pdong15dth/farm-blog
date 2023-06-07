import prisma from '@/src/services/basePrisma/BasePrisma';
import utils from '@/src/utils/constant'

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.name)
    var slug = b
    const result = await prisma.national.upsert({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        create: {
            name: body.name,
            slug: slug,
            isCountry: body.isCountry
        },
        update: {
            name: body.nationalName,
            slug: slug,
            isCountry: body.isCountry
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
