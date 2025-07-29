import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
    { id: 1, username: 'noam', password: '1234', role: 'commander' },
    { id: 2, username: 'dan', password: 'abcd', role: 'soldier' },
  ];

  checkUser(username:string,password:string){
        return this.users.find(user=> user.username == username && user.password == password)
  }

  
}
