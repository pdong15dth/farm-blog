import prisma from "@/src/services/basePrisma/BasePrisma";

export default async function handle(req, res) {
    const body = JSON.parse(req.body)
    const result = await prisma.national.delete({
        where: {
            id: parseInt(body?.id)
        }
    }).catch (error => {
        return res.json({
            message: "Quốc gia không tồn tại. Vui lòng làm mới lại trang"
        });
    });

    res.json(result);
}