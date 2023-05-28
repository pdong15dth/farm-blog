import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {

    console.log(req.query.id)
    const result = await prisma.post.findUnique({
        where: {
            id: parseInt(req.query.id)
        }
    }).catch(error => {
        res.json({
            code: 404,
            message: "Không tìm thấy bài viết"
        });
    });
    console.log(result)
    res.json(result ?? {
        code: 404,
        message: "Không tìm thấy bài viết"
    });
}
