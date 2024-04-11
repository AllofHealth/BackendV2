import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { CreateUserDto } from './users/dto/create.user.dto';
import { MyLoggerService } from './my-logger/my-logger.service';

@SkipThrottle()
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
    private readonly logger: MyLoggerService,
  ) {}

  @Get('all')
  @Throttle({ long: { ttl: 60000, limit: 100 } })
  async fetchAllEmployees() {
    return await this.appService.fetchAllEmployees();
  }

  @Get('employees')
  @Throttle({ short: { ttl: 1000, limit: 1 } })
  async fetchOnlyEmployees(@Ip() ip: string) {
    this.logger.log(ip, 'fetchOnlyEmployees');
    return await this.appService.fetchOnlyEmployees();
  }

  @Post()
  async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
