import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../usermongo/user.schema';
import { UserMongoService } from '../usermongo/usermongo.service';
import { UserMongoController } from '../usermongo/usermongo.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [UserMongoController],
  providers: [UserMongoService],
})
export class UsermongoModule {}
