import { Session } from './session';
import { User } from 'src/app/models/user.model';

class SessionStore {
    private sessions: {[key: string]: Session} = {};

    public createSession(sessionId: string, user: User) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }
}

export const sessionStore = new SessionStore();