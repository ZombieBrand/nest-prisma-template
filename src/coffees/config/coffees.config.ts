import { registerAs } from '@nestjs/config';
export default registerAs('coffees', () => ({
  testData: {
    name: 'test',
    value: 'test',
  },
}));
