import { License } from '@prisma/client';
export class LicenseEntity implements License {
  id: string;
  CPUID: string;
  macAddress: string;
  company: string;
  model: string;
  telphone: string;
  address: string;
  reason: string;
  applyTime: Date;
  deadline: Date;
  manageDeviceNum: number;
  functionModel: string;
  createdAt: Date;
  updatedAt: Date;
  constructor(partial: Partial<LicenseEntity>) {
    Object.assign(this, partial);
  }
}
