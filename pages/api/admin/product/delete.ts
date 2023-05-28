import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.product.delete({
        where: {
            id: parseInt(body?.id)
        }
    }).catch (error => {
        return res.json({
            message: "Bài viết không tồn tại. Vui lòng làm mới lại trang"
        });
    });

    res.json(result);
}