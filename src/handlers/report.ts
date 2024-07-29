import prisma from "../db";


export const createReport = async (req, res) => {
    // TODO : data user didapat dari middleware
    const {title, content, reportDate} = req.body;
    const photoUrl = req.file ? req.file.path : null;
    const userId = req.user.id;

    try {
        const report = await prisma.report.create({
            data: {
                title: title,
                content: content,
                reportDate: new Date(reportDate),
                photoUrl: photoUrl,
                userId: userId
            }
        })
        res.status(201).json(report);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}