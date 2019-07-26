import * as _ from 'lodash';
import { LESSONS, USERS } from './database-data';
import { DatabaseUser } from './database-user';

class InMemoryDatabase {

  public userCounter: number = 0;

  public readAllLessons() {
    return _.values(LESSONS);
  }

  createUser(email: string, password: string) {

    this.userCounter++;
    
    const id = this.userCounter;
    const user: DatabaseUser = {
      id,
      email,
      password
    }

    USERS[id] = user;
    return user;
  }

}

export const database = new InMemoryDatabase();
