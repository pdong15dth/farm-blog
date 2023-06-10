import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {
    console.log("Thanh Pham")
    const result = await prisma.finishProduct.findUnique({
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
