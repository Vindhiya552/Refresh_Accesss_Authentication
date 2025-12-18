import { Module } from '@nestjs/common';
import { userentities } from './user.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../usermongo/user.schema';
import { UserMongoService } from '../usermongo/usermongo.service';
import { UserMongoController } from '../usermongo/usermongo.controller';
@Module({
  //want to use this entity (database table model) inside this module.
  //NestJS needs to know which repository (table) to inject into the service
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    //   TypeOrmModule.forFeature([userentities]),
    // JwtModule.register({
    //   secret: 'yourSecretKey123',   // keep in .env in real project
    //   signOptions: { expiresIn: '1h' },
    // }),

    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  // controllers: [UserController],
  // providers: [UserService],

  controllers: [UserMongoController],
  providers: [UserMongoService],
})
export class UserModule {}
