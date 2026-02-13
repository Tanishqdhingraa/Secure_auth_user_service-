import jwt from 'jsonwebtoken'

const generateAccessToken = (user)=>{
    return jwt.sign(user,
        process.env.JWT_SECRET,
        {expiresIn:"30m"}
    )
}


const generateRefrshToken = (user)=>{
    return jwt.sign(user,
        process.env.REFRESH_SECRET,
        {expiresIn:"30m"}
    )
}
module.exports = {generateAccessToken,generateRefrshToken}
