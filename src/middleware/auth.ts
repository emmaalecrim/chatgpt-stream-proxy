import { NextFunction, Request } from 'express';
import { getIdFromToken } from '../utils/firebase';

export const authenticate = async (req: Request, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return next();
    const token = authorization.split(' ')[1];
    try {
        const client = await getIdFromToken(token);
        return next(client)
    } catch (e: any) {
        console.log("Auth middleware error:", e.message);
        return next(null)
    }
}