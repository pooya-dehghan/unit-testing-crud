import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDTO, UpdateUserDTO } from './dtos';
import { MongoIdPipe, NumberPipe, Pagination } from './pipes';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() body: CreateUserDTO) {
    const user = await this.usersService.selectOne({ email: body.email });
    if (user) throw new BadRequestException('This Email is Already Taken');
    return this.usersService.insert(body);
  }

  @Delete(':id')
  async deleteUser(@Param('id', MongoIdPipe) userId: string) {
    const isDelete = await this.usersService.delete(userId);
    if (!isDelete) throw new NotFoundException();
    return { message: `User With id ${userId} has Deleted` };
  }

  @Patch(':id')
  async updateUser(
    @Body() body: UpdateUserDTO,
    @Param('id', MongoIdPipe) userId: string,
  ) {
    const updatedUser = await this.usersService.update(userId, body);
    if (!updatedUser) throw new NotFoundException();
    return updatedUser;
  }

  @Get(':id')
  async getSingleUser(@Param('id', MongoIdPipe) userId: string) {
    const user = await this.usersService.selectOne({ _id: userId });
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  getAllUsers(@Query(NumberPipe) query: Pagination) {
    return this.usersService.select(
      query.page as number,
      query.limit as number,
    );
  }
}
