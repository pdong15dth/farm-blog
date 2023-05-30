import prisma from '@/src/services/basePrisma/BasePrisma'
import utils from '@/src/utils/constant'

export default async function handle(req, res) {
    console.log("debug 1")
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.title)
    var slug = b
    var slugOriginal = b
    console.log("debug 1")

    const result = await prisma.finishProduct.upsert({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        create: {
            title: body.title,
            description: body.description,
            content: body.content,
            slug: slug,
            slugOriginal: slugOriginal,
            image: body.image,
            data: body.data,
            country: body.countries,
            national: body.national,
            productId: body.productId,
            published: body.published
        },
        update: {
            title: body.title,
            description: body.description,
            content: body.content,
            slug: slug,
            slugOriginal: slugOriginal,
            image: body.image,
            data: body.data,
            country: body.countries,
            national: body.national,
            productId: body.productId,
            published: body.published
        }
    }).catch(error => {
        console.log("Loi roi");
        console.log(error);
    });

    console.log(result)
    res.json(result, {});
}
