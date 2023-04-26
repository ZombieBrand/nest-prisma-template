import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLicenseDto } from './dto/create-license.dto';
import { UpdateLicenseDto } from './dto/update-license.dto';
import { License as LicenseModel } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { sm4 } from 'sm-crypto';
import { EOL } from 'os';
import { SECRET } from './utils/SECRET';
import { dateFilter } from 'src/utils/dateFilter';

@Injectable()
export class LicensesService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createLicenseDto: CreateLicenseDto): Promise<LicenseModel> {
    const _createLicenseDto = { ...createLicenseDto };
    const { CPUID, macAddress } = _createLicenseDto;
    const existingCPUID = await this.prismaService.license.findUnique({
      where: {
        CPUID,
      },
    });
    const existingMac = await this.prismaService.license.findUnique({
      where: {
        macAddress,
      },
    });
    if (existingCPUID) {
      throw new HttpException('CPUID已存在', HttpStatus.BAD_REQUEST);
    }
    if (existingMac) {
      throw new HttpException('mac地址已存在', HttpStatus.BAD_REQUEST);
    }
    try {
      const createLicense = await this.prismaService.license.create({
        data: {
          ..._createLicenseDto,
        },
      });
      console.log(createLicense, 'createLicense');
      return createLicense;
    } catch (error) {
      throw new HttpException('新增授权失败', -1);
    }
  }

  async findAll(paginationQuery: PaginationQueryDto): Promise<LicenseModel[]> {
    const { limit, offset } = paginationQuery;
    const licenses = await this.prismaService.license.findMany({
      take: limit,
      skip: (offset - 1) * limit,
      orderBy: {
        updatedAt: 'desc',
      },
    });
    return licenses;
  }

  findOne(id: number) {
    return `This action returns a #${id} license`;
  }

  update(id: string, updateLicenseDto: UpdateLicenseDto) {
    return this.prismaService.license.update({
      where: {
        id,
      },
      data: {
        ...updateLicenseDto,
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.license.delete({ where: { id } });
  }
  async count() {
    const count = await this.prismaService.license.count();
    return count;
  }
  async upload(file: Express.Multer.File) {
    const decryptData = sm4.decrypt(file.buffer, SECRET);
    console.log(decryptData, 'decryptData');
    const fileDataArr = decryptData
      .split(EOL)
      .map((item) => {
        return item.split(':');
      })
      .filter((item) => item.length === 2);
    const fileDataObj = Object.fromEntries(fileDataArr);
    const result = await this.create({
      CPUID: `${fileDataObj.CPUID}/${fileDataObj.MAC}`,
      macAddress: fileDataObj.MAC,
      company: fileDataObj.name,
      model: fileDataObj.model,
      telphone: fileDataObj.telphone ?? '',
      address: fileDataObj.address ?? '',
      reason: fileDataObj.reason ?? '',
      applyTime: new Date(fileDataObj.applyTime),
      deadline: new Date(Date.now()),
      manageDeviceNum: 0,
    });
    return result;
  }
  async download(id: string) {
    const license = await this.prismaService.license.findUnique({
      where: {
        id,
      },
    });
    console.log(license, 'license');
    const CPUID = license.CPUID.split('/');
    const encryptData = sm4.encrypt(
      `MAC:${license.macAddress}\nCPUID:${CPUID[0]}\nname:${
        license.company
      }\nmodel:${license.model}\napplyTime:${dateFilter(
        license.applyTime,
      )}\ndeadline:${dateFilter(license.deadline)}\nmanageDeviceNum:${
        license.manageDeviceNum
      }\nfunctionModel:`,
      SECRET,
    );
    return encryptData;
  }
}
