import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Organisation, OrganisationDocument } from './organisation.schema';
import { CreateOrganisationDto } from 'src/dto/Organisation.dto';

@Injectable()
export class OrganisationService {
  constructor(
    @InjectModel(Organisation.name)
    private orgModel: Model<OrganisationDocument>,

    private readonly jwtService: JwtService,
  ) {}

  // Register
  // async create(dto: CreateOrganisationDto) {
  //   const newUser = new this.orgModel({
  //     ...dto,
  //   });

  //   return await newUser.save();
  // }
  async create(dto: CreateOrganisationDto) {
    try {
      // ❗ 1. BAD REQUEST (400) — Validate required fields manually if needed
      if (!dto.name || !dto.code) {
        throw new HttpException('Invalid data', HttpStatus.BAD_REQUEST);
      }

      // ❗ 2. CONFLICT (409) — Check if already exists
      const exists = await this.orgModel.findOne({ code: dto.code });

      if (exists) {
        throw new HttpException('Already exists', HttpStatus.CONFLICT);
      }

      // ❗ 3. SUCCESS — Create and save
      const newUser = new this.orgModel({ ...dto });
      const savedUser = await newUser.save();

      return {
        status: 201,
        message: 'Organisation created successfully',
        data: savedUser,
      };
    } catch (error) {
      // ❗ 4. If error is already thrown above, rethrow it
      if (error instanceof HttpException) {
        throw error;
      }

      // ❗ 5. INTERNAL SERVER ERROR (500) — For unexpected errors
      throw new HttpException('Server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // ✅ Find all organisations

  async findAll(): Promise<Organisation[]> {
    return this.orgModel.find();
  }

  async update(id: string, dto: Partial<Organisation>): Promise<Organisation> {
    // If code is being updated, ensure it stays unique
    if (dto.code) {
      const exists = await this.orgModel
        .findOne({ code: dto.code, _id: { $ne: id } })
        .lean();
      if (exists) {
        throw 'Another organisation already uses this code';
      }
    }

    const updated = await this.orgModel
      .findByIdAndUpdate(id, dto, { new: true, runValidators: true })
      .lean();

    if (!updated) throw 'Organisation not found';
    return updated as Organisation;
  }

  // ✅ Delete by id (hard delete)
  async remove(id: number): Promise<string> {
    const res = await this.orgModel.findByIdAndDelete(id);
    if (!res) throw 'Organisation not found';
    return 'Successfully';
  }
}
