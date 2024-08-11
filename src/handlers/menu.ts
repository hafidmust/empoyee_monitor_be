import { Role } from "@prisma/client";
import prisma from "../db";
export const getListMenuByRole = async (req, res) => {
    const user = req.user;
    console.log(`ini user : ${user.id}`);
    console.log(`ini role : ${user.role}`);
    try {
        const menus = await prisma.menu.findMany({
            where: {
                allowedRoles: {
                    has: user.role
                }
            }
        })
        console.log(`ini menu : ${menus}`);
        res.json({
            message: 'success',
            responseData: menus
        });

    }
    catch (e) {
        console.log(e);
        res.status(500).json({
            error: 'Something went wrong ' + e
        });
    }
}