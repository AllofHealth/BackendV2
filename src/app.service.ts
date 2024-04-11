import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users/users.service';
import { CreateUserDto } from './users/dto/create.user.dto';
import { MyLoggerService } from './my-logger/my-logger.service';

@Injectable()
export class AppService {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new MyLoggerService(AppService.name);

  async fetchAllEmployees() {
    try {
      const users = await this.usersService.findAll();
      if (!users) throw new NotFoundException('No users found');
      return users;
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      throw new InternalServerErrorException('something went wrong');
    }
  }

  async fetchOnlyEmployees() {
    try {
      const users = await this.usersService.findAll();
      if (!users) throw new NotFoundException('No users found');
      return users.filter((user) => user.role === 'EMPLOYEE');
    } catch (error) {
      if (error instanceof Error)
        throw new HttpException('An error occurred', HttpStatus.BAD_REQUEST);
      throw new InternalServerErrorException();
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      if (error instanceof Error)
        this.logger.info(error.message, 'usersService.createUser');
      throw new InternalServerErrorException('something went wrong');
    }
  }
}
