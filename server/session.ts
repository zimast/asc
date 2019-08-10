import * as moment from 'moment';
import { User } from 'src/app/models/user.model';

export class Session {

    public static readonly VALIDITY_MINUTES = 2;
    private validUntil: moment.Moment;

    constructor(public sessionId: string, public user: User) {
        this.validUntil = moment().add(Session.VALIDITY_MINUTES, 'minutes');
    }

    public isValid() {
        return moment().diff(this.validUntil, 'minutes') <= 0;
    }
}