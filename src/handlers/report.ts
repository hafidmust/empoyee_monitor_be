import prisma from "../db";


export const createReport = async (req, res) => {
    console.log('req.body', req);
    // TODO : data user didapat dari middleware
    const {title, content, reportDate} = req.body;
    const photoUrl = req.file ? req.file.path : null;
    console.log('photoUrl', photoUrl);
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
        res.status(201).json({
            message: 'success',
            responseData: report
        });
    }catch(e) {
        res.status(500).json({
            message: 'error',
            responseData: null});
    }
}
export const getAllReports = async (req, res) => {
    try {
        const reports = await prisma.report.findMany({
            
            select: {
                id: true,
                title: true,
                content: true,
                reportDate: true,
                photoUrl: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
        res.json({
            message: 'success',
            responseData: reports
        });
    }catch(e){
        res.status(500).json({error: 'Something went wrong '+e});
    }
}
export const getReportById = async (req, res) => {
    const {id} = req.params;
    try{
        const report = await prisma.report.findUnique({
            where: {
                id: parseInt(id)
            },
            include: {
                user: {
                    select: {
                        username: true
                    }
                }
            }
        });
        res.json({
            message: 'success',
            responseData: report
        });
    }catch(e){
        res.status(500).json({error: 'Something went wrong '+e});
    }
}