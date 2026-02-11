import jwt from 'jsonwebtoken'

const authenticate = async(req , res , next)=>{

    const token = req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(400).json({
            message:`No headers found`
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({
            message:`Some error in Auth_middleware`
        })
    }
}

module.exports = authenticate;