import { Session } from './session';
import { User } from 'src/app/models/user.model';

class SessionStore {

    private sessions: { [key: string]: Session } = {};

    public createSession(sessionId: string, user: User) {
        this.sessions[sessionId] = new Session(sessionId, user);
    }

    public findUserBySessionId(sessionId: string): User | undefined {
        const session = this.sessions[sessionId];
        return this.isSessionValid(sessionId) ? session.user : undefined;
    }

    public isSessionValid(sessionId: string): boolean {
        const session = this.sessions[sessionId];
        return session && session.isValid();
    }

    public destroySession(sessionId: string) {
        delete this.sessions[sessionId];
    }
}

export const sessionStore = new SessionStore();