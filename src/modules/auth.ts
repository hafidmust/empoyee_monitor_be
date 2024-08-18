import jwt from 'jsonwebtoken';

//create token
export const createJWT = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role
    }, process.env.JWT_SECRET)
    return token;
}

//middleware to verify token
export const protect = (req, res, next) => {
    const bearer = req.headers.authorization;
    console.log("bearer ==>", bearer);

    if (!bearer) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const [, token] = bearer.split('Bearer ');
    if(!token) {
        res.status(401).json({ message: 'Not valid token' });
        return;
    }

    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }catch(err) {
        res.status(401).json({ message: 'Not valid token' });
        return;
    }
    
}