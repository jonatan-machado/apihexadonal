import UseCase from '@/core/shared/UseCase';
import Errors from '@/core/shared/Errors';
import ProviderCripto from './ProviderCripto';
import UserRepository from './UserRepository';
import User from '../model/User';

export type Input = {
  email: string;
  password: string;
};

export default class LoginUser implements UseCase<Input, User> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly providerCripto: ProviderCripto,
  ) {}

  async execute(user: Input): Promise<User> {
    const userExists = await this.userRepository.findByEmail(user.email);
    if (!userExists) throw new Error(Errors.USER_NOT_FOUND);

    const passwordMatch = await this.providerCripto.compare(
      user.password,
      userExists.password!,
    );
    if (!passwordMatch) throw new Error(Errors.INVALID_CREDENTIALS);
    return { ...userExists, password: undefined };
  }
}
