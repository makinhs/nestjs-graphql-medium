import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginInput } from './dto/login.input';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  login(loginInput: LoginInput) {
    //todo: implement your logic properly...
    if (loginInput.username === 'foo' && loginInput.password === 'bar') {
      const accessToken = sign({ foo: 'bar' }, 'MY_NotSuperS3cr3t');
      return { accessToken };
    }
    throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
  }

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
