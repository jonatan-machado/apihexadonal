import bcrypt from 'bcrypt';
import ProviderCripto from '@/core/user/service/ProviderCripto';

export default class PasswordCripto implements ProviderCripto {
  async encrypt(value: string): Promise<string> {
    return bcrypt.hashSync(value, 10);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
