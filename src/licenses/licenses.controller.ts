import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { LicensesService } from './licenses.service';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { LicenseEntity } from './entities/license.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { join } from 'path';
import { writeFileSync, readFileSync } from 'fs';
@Controller('licenses')
export class LicensesController {
  constructor(private readonly licensesService: LicensesService) {}

  @Post()
  async create(@Body() createLicenseDto: CreateLicenseDto) {
    return new LicenseEntity(
      await this.licensesService.create(createLicenseDto),
    );
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    const licenses = await this.licensesService.findAll(paginationQuery);
    const count = await this.licensesService.count();
    return {
      data: {
        list: licenses.map((license) => new LicenseEntity(license)),
        count,
      },
      message: '获取授权信息成功',
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.licensesService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLicenseDto: UpdateLicenseDto,
  ) {
    return {
      message: '授权编辑成功',
      data: await this.licensesService.update(id, updateLicenseDto),
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.licensesService.remove(id);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return {
      message: '申请授权文件上传成功',
      data: await this.licensesService.upload(file),
    };
  }
  @Get('/download/:id')
  async download(@Param('id') id: string) {
    const data = await this.licensesService.download(id);
    return data;
  }
}
