import { users } from './user';
import * as bcrypt from 'bcryptjs';
export default async (prisma) => {
  for (const user of users) {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: user.username,
      },
    });
    if (!existingUser) {
      const _user = { ...user };
      _user.password = await bcrypt.hash(_user.password, 10);
      await prisma.user.create({
        data: _user,
      });
    }
  }
};
