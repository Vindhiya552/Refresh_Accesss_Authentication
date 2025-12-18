import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrganisationDocument = Organisation & Document;

@Schema({ collection: 'organisations', timestamps: true })
export class Organisation {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string; // short unique code

  @Prop()
  domain?: string;

  @Prop()
  contactEmail?: string;

  @Prop({ default: true })
  isActive: boolean;
}

export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
