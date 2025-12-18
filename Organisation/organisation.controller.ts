import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { OrganisationService } from './organisation.service';
import { CreateOrganisationDto } from 'src/dto/Organisation.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('Organisation')
export class OrganisationController {
  constructor(private readonly appService: OrganisationService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async Createuser(@Body() dto: CreateOrganisationDto) {
    return await this.appService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    console.time('findAllTime');

    const data = await this.appService.findAll();

    console.timeEnd('findAllTime');

    return data;

    // return this.appService.findAll();
  }

  // ✅ Update
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: any) {
    return this.appService.update(id, dto);
  }

  //   ✅ Delete
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
}
