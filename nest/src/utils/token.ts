import jwt from 'jsonwebtoken';
export function generateToken(_id:string){
    return jwt.sign({_id}, process.env.JWT_SECRET as string , {
        expiresIn: process.env.JWT_EXPIRES_IN as string | any
    })
}