import { database } from './database';
import { HTTP_STATUS_CODES } from './http-status-codes';
import { sessionStore } from './session-store';

export function readAllLessons(request, response) {

  const sessionId = request.cookies['SESSIONID'];
  const isSessionValid = sessionStore.isSessionValid(sessionId);

  if (!isSessionValid) {
    response.sendStatus(HTTP_STATUS_CODES.forbidden);
  } else {
    response.status(HTTP_STATUS_CODES.success).json({ lessons: database.readAllLessons() });
  }

}
