import { report } from "process";
import prisma from "../db";
import { ReportStatus } from "@prisma/client";


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
export const getAllReportsMe = async (req, res) => {
    try{
        const reports = await prisma.report.findMany({
            where: {
                userId: req.user.id
            }
        });
        res.json({
            message: 'success',
            responseData: reports
        })
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
                        username: true,
                        fullName: true
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
export const updateReportAcc = async (req, res) => {
    try{
        const { id } = req.params;
    const { status } = req.body;

    try {
        const updatedReport = await prisma.report.update({
            where: { id: parseInt(id) },
            data: { status: ReportStatus.ACCEPTED }
        });

        res.json({
            message: 'success',
            responseData: updatedReport
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    }catch(e){
        res.status(500).json({error: 'Something went wrong '+e});
    }
    
}
export const updateReportReject = async (req, res) => {
    try{
        const { id } = req.params;

    try {
        const updatedReport = await prisma.report.update({
            where: { id: parseInt(id) },
            data: { status: ReportStatus.REJECTED }
        });

        res.json({
            message: 'success',
            responseData: updatedReport
        });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
    }catch(e){
        res.status(500).json({error: 'Something went wrong '+e});
    }
    
}

export const dashboardReport = async (req, res) => {
        try {
            // const reports = await prisma.report.findMany(
            //     {
            //         where: {
            //             id: req.user.id
            //         }
            //     }
            // );
            // const statusTotals = reports.reduce((acc, report) => {
            //     if (!acc[report.status]) {
            //         acc[report.status] = 0;
            //     }
            //     acc[report.status]++;
            //     return acc;
            // }, {});

            const pendingCount = await prisma.report.count({
                where: {
                    status: ReportStatus.PENDING,
                    userId: req.user.id
                }
            });

            const acceptedCount = await prisma.report.count({
                where: {
                    status: ReportStatus.ACCEPTED,
                    userId: req.user.id
                }
            });

            const rejectedCount = await prisma.report.count({
                where: {
                    status: ReportStatus.REJECTED,
                    userId: req.user.id
                }
            });
            // console.log(reports);
            res.json({
                message: 'success',
                responseData: {
                    "ACCEPTED": acceptedCount,
                    "PENDING": pendingCount,
                    "REJECTED": rejectedCount
                }
            });
        } catch (error) {
            console.error('Error fetching status totals:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
}

export const detailListByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const reports = await prisma.report.findMany({
            where: {
                status: status.toUpperCase() as ReportStatus,
                userId: req.user.id
            }
        });
        res.json({
            message: 'success',
            responseData: reports
        });
    } catch (error) {
        console.error('Error fetching status totals:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}