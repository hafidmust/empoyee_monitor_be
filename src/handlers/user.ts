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