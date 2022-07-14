import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO } from './dtos';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  insert(context: CreateUserDTO) {
    return this.usersModel.create(context);
  }

  delete(userId: string) {
    return this.usersModel.findByIdAndDelete(userId);
  }

  update(userId: string, contextUpdate: Partial<UserDocument>) {
    return this.usersModel.findByIdAndUpdate(
      userId,
      { $set: contextUpdate },
      { new: true },
    );
  }

  select(page: number, limit: number) {
    return this.usersModel
      .find({})
      .sort('-createdAt')
      .skip(page * limit)
      .limit(limit);
  }

  selectOne(query: { [key: string]: any }) {
    return this.usersModel.findOne(query);
  }
}
