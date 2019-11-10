import * as _ from 'lodash';
import { LESSONS, USERS } from './database-data';
import { DatabaseUser } from './database-user';

class InMemoryDatabase {

  public userCounter: number = 0;

  public readAllLessons() {
    return _.values(LESSONS);
  }

  public createUser(email: string, passwordDigest: string) {
    const usersPerEmail = _.keyBy(_.values(USERS), 'email');

    if (usersPerEmail[email]) {
      const message = 'An user already exists with email ' + email;
      console.error(message);
      throw new Error(message);
    }

    this.userCounter++;

    const id = this.userCounter;

    const user: DatabaseUser = {
      id,
      email,
      passwordDigest,
      roles: ['STUDENT']
    };

    USERS[id] = user;

    console.log(USERS);

    return user;
  }

  public findUserByEmail(email: string): DatabaseUser {
    const users = _.values(USERS);
    return _.find(users, user => user.email === email);
  }

  public findUserById(userId: string): DatabaseUser {
    let user;
    if (userId) {
      console.log('looking for userId ', userId);
      const users = _.values(USERS);
      user = _.find(users, u => u.id.toString() === userId);
      console.log('user data found:', user);
    }
    return user;
  }

}

export const database = new InMemoryDatabase();
