import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { createuserdto } from 'src/dto/user.dto';
import { logindto } from 'src/dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

export interface LoginResult {
  success: boolean;
  message: string;
  token?: string;
  user?: any;
}

@Injectable()
export class UserMongoService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,

    private readonly jwtService: JwtService,
  ) {}

  // Register
  async create(dto: createuserdto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const newUser = new this.userModel({
      ...dto,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  // Login
  async login(dto: logindto) {
    const { email, password } = dto;

    // 1. Check email exists
    const user = await this.userModel.findOne({ email });

    if (!user) {
      return { success: false, message: 'Email does not exist' };
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Incorrect password' };
    }

    // 3. JWT payload
    const payload = {
      id: user._id,
      email: user.email,
    };

    // Short lived token (2 minutes)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '2m',
    });

    //  Long lived token (7 days)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);

    await this.userModel.updateOne(
      { _id: user._id },
      { refreshToken: hashedRefreshToken },
    );

    return {
      success: true,
      message: 'Login successful',
      accessToken,
      refreshToken,
      user: payload,
    };
  }
}
