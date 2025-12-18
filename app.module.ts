// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserModule } from './User/user.module';
// import { userentities } from './User/user.entities';
// import { JwtModule } from "@nestjs/jwt";

// @Module({
//   imports: [
// //**Connects NestJS to the database (global DB connection) */

//     ConfigModule.forRoot(),
//     //Initializes TypeORM (database connection
//     //You don't need to create an object to use a static method or variable
//     //**Allows this module to use the userentities repository (table access) */
//     TypeOrmModule.forRootAsync({
//       //module can access (.env) using ConfigService
//     imports: [ConfigModule],
//   useFactory: (configService: ConfigService) => ({
//     //useFactory is used to create and return dynamic configuration values
//     //use it to read values from ConfigService
//     type: 'mysql',
//     host: configService.get('DB_HOST'),
//     port: +configService.get('DB_PORT'),
//     username: configService.get('DB_USERNAME'),
//     password: configService.get('DB_PASSWORD'),
//     database: configService.get('DB_NAME'),
//     entities: [userentities],
//     synchronize: true,
//   }),
//   inject: [ConfigService],
//   }),
//     UserModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsermongoModule } from './usermongo/user.module';
import { OrganisationModule } from './Organisation/organisation.module';
import { authModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),

    // CONNECT TO MONGODB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    UsermongoModule,
    OrganisationModule,
    authModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
