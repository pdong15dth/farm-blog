import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {
    const result = await prisma.product.findUnique({
        where: {
            id: parseInt(req.query.id)
        }
    }).catch(error => {
        res.json({
            code: 404,
            message: "Không tìm thấy bài viết"
        });
    });
    res.json(result ?? {
        code: 404,
        message: "Không tìm thấy bài viết"
    });
}
