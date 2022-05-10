import { Role } from '../src/types/role.enum';
export const users = [
  {
    username: 'superAdmin',
    nickname: 'superAdmin',
    password: 'admin@123',
    email: '',
    avatar: '',
    role: Role.SuperAdmin,
  },
  {
    username: 'admin',
    nickname: 'admin',
    password: 'admin@123',
    email: '',
    avatar: '',
    role: Role.Admin,
  },
];
