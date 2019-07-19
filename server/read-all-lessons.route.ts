import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function readAllLessons(request, response) {
  response.status(HTTP_STATUS_CODES.success).json({ lessons: database.readAllLessons() });
}
