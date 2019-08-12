import * as _ from 'lodash';
import { LESSONS, USERS } from './database-data';
import { DatabaseUser } from './database-user';

class InMemoryDatabase {

  public userCounter: number = 0;

  public readAllLessons() {
    return _.values(LESSONS);
  }

  public createUser(email: string, passwordDigest: string) {
    this.userCounter++;
    const id = this.userCounter;
    const user: DatabaseUser = {
      id,
      email,
      passwordDigest
    };
    USERS[id] = user;
    return user;
  }

  public findUserByEmail(email: string): DatabaseUser {
    const users = _.values(USERS);
    return _.find(users, user => user.email === email);
  }

  public findUserById(userId: string): DatabaseUser {
    let user = undefined;
    if (userId) {
      console.log("looking for userId ", userId);
      const users = _.values(USERS);
      user = _.find(users, user => user.id.toString() === userId);
      console.log("user data found:", user);
    }
    return user;
  }

}

export const database = new InMemoryDatabase();
