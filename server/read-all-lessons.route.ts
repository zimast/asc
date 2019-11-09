import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';

export function readAllLessons(request, response) {
  console.log('User is reading lessons data', request.user);
  response.status(HTTP_STATUS_CODES.success).json({ lessons: database.readAllLessons() });
}
