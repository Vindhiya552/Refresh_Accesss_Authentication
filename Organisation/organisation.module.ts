import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { Organisation, OrganisationSchema } from './organisation.schema';
import { OrganisationService } from './organisation.service';
import { OrganisationController } from './organisation.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organisation.name, schema: OrganisationSchema },
    ]),

    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '1d' },
    }),
  ],

  controllers: [OrganisationController],
  providers: [OrganisationService],
})
export class OrganisationModule {}
