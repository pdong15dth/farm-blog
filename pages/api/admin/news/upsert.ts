import utils from '@/src/utils/constant'
import prisma from '@/src/services/basePrisma/BasePrisma';

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    var b = utils.ChangeToSlug(body.title)
    var slug = b
    var slugOriginal = b
    console.log(body)
    const result = await prisma.post.upsert({
        where: {
            id: parseInt(body?.id ?? 0) ?? 0
        },
        create: {
            title: body.title,
            slug: slug,
            slugOriginal: slugOriginal,
            image: body.image,
            description: body.description,
            content: body.content,
            authorId: body.authorId,
            published: body.published
        },
        update: {
            title: body.title,
            slug: slug,
            slugOriginal: slugOriginal,
            image: body.image,
            description: body.description,
            content: body.content,
            authorId: body.authorId,
            published: body.published
        }
    });
    res.json(result);
}
