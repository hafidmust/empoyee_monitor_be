import exp from "constants";
import prisma from "../db"
import { createJWT } from "../modules/auth";

/**
 * @swagger
 * components:
 *  securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 * tags:
 *  -name: Authentication
 * /signin:
 *   post:
 *     summary: Sign in to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
 */

export const signin = async (req, res) =>{
    const { username, password } = req.body;

    try{
        const user = await prisma.user.findUnique({
            where: {
                username: username,
                password: password
            }
        });
        if(!user) {
            res.status(401).json({message: 'Invalid username or password',responseData: null});
            return;
        }
        const token = createJWT(user);
        console.log('token', token);
        res.json({
            message: 'success',
            responseData: {
                token: token
            }
        });
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Sign up to the system
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */

export const signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                username: username,
                password: password,
                role: 'STAFF'
            }
        });
        res.status(201).json(user);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

/**
 * @swagger
 * /api/v1/user:
 *   get:
 *     summary: Get user profile
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */

export const getProfile = async (req, res) => {
    const user = req.user;
    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select:{
                fullName: true,
                username: true,
                role: true,
                createdAt: true,
                position: true,
            }
        });
        res.json({
            message: 'success',
            responseData: profile
        });
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

/**
 * @swagger
 * /api/v1/user/staff:
 *   get:
 *     summary: Get all staff
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                   username:
 *                     type: string
 *                   role:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */

export const getStaff = async (req, res) => {
    try {
        const staff = await prisma.user.findMany({
            where: {
                role: 'STAFF'
            },
            select: {
                id: true,
                fullName: true,
                username: true,
                role: true,
                createdAt: true
            }
        });
        console.log(staff);
        res.json({
            message: 'success',
            responseData: staff
        });
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}