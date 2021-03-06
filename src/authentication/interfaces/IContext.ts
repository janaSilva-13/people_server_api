import { userContextPayload } from '../types/userContextPayload';
import { Request, Response } from 'express';

export interface IContext {
    req: Request,
    res: Response,
    payload?: userContextPayload
}