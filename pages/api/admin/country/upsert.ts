import prisma from '@/src/services/basePrisma/BasePrisma';
import utils from '@/src/utils/constant'

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.countryName)
    var slug = b
    const result = await prisma.country.upsert({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        create: {
            countryName: body.countryName,
            slug: slug,
        },
        update: {
            countryName: body.countryName,
            slug: slug,
        }
    }).catch(error => {
        console.log("Lỗi ở đây này")
        return res.json({
            code: 401,
            message: "Tỉnh thành đã tồn tại"
        });
    });
    
    res.json(result ?? {
        code: 401,
        message: "Tỉnh thành đã tồn tại"
    });
}
