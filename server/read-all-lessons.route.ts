import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { Request, Response } from 'express';

export function readAllLessons(request: Request, response: Response) {
  response.status(HTTP_STATUS_CODES.success).json({ lessons: database.readAllLessons() });
}
