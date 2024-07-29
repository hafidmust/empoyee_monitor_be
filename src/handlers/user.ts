import exp from "constants";
import prisma from "../db"
import { createJWT } from "../modules/auth";

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
            res.status(401).json({message: 'Invalid username or password'});
            return;
        }
        const token = createJWT(user);
        res.json(token);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

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

export const getProfile = async (req, res) => {
    const user = req.user;
    try {
        const profile = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            select:{
                username: true,
                role: true,
                createdAt: true

            }
        });
        res.json(profile);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}

export const getStaff = async (req, res) => {
    try {
        const staff = await prisma.user.findMany({
            where: {
                role: 'STAFF'
            },
            select: {
                id: true,
                username: true,
                role: true,
                createdAt: true
            }
        });
        res.json(staff);
    }catch(e) {
        res.status(500).json({error: 'Something went wrong '+e});
    }
}