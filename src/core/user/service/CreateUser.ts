import UseCase from '@/core/shared/UseCase';
import Errors from '@/core/shared/Errors';
import Id from '@/core/shared/Id';
import ProviderCripto from './ProviderCripto';
import UserRepository from './UserRepository';
import User from '../model/User';

export default class CreateUser implements UseCase<User, void> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly providerCripto: ProviderCripto,
  ) {}

  async execute(user: User): Promise<void> {
    const passwordCrypt = await this.providerCripto.encrypt(user.password!);

    const userExists = await this.userRepository.findByEmail(user.email);

    if (userExists.length === 1) throw new Error(Errors.USER_EXISTS);

    const newUser: User = {
      id: Id.generateHash(),
      name: user.name,
      email: user.email,
      password: passwordCrypt,
    };

    this.userRepository.save(newUser);
  }
}
