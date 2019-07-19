import * as _ from 'lodash';
import { LESSONS, USERS } from './database-data';
import { DatabaseUser } from './database-user';

class InMemoryDatabase {

  public userCounter: number = 2;

  public readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, passwordDigest: string) {
    const usersPerEmail: any = _.keyBy(_.values(USERS), 'email');
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

  findUserByEmail(email: string): DatabaseUser {
    console.log('Finding user by email:', email);
    const users = _.values(USERS);
    const user = _.find(users, (u: any) => u.email === email);
    console.log('user retrieved:', user);
    return user;
  }

  findUserById(userId: string): DatabaseUser {
        let user;
        if (userId) {
            console.log('looking for userId ', userId);
            const users = _.values(USERS);
            user = _.find(users, (u: any) => u.id.toString() === userId);
            console.log('user data found:', user);
        }
        return user;
    }

}

export const database = new InMemoryDatabase();
