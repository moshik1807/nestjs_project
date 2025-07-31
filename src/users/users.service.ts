import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import User from './users.entity';

@Injectable()
export class UsersService {
  async create(body) {
    const hashPassword = await bcrypt.hash(body.password, 10)
    const user = new User()
    user.username = body.username
    user.password = hashPassword
    user.role = body.role
    return await user.save()
  }

  async getUserById(id: number) {
    return await User.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return await User.findOne({ where: { username } });
  }


  async checkUser(username: string, password: string) {
    const user = await User.findOne({ where: { username } })
    if (!user) return null
    const checkPassword = await bcrypt.compare(password, user.password)
    if (checkPassword) { return user }
    else { return null }
  }

  async getAllUsers() {
    return await User.find()
  }

}
