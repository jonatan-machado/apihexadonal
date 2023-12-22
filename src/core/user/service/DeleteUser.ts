import UseCase from '../../shared/UseCase';
import Errors from '../../shared/Errors';
import UserRepository from './UserRepository';

export default class DeleteUser implements UseCase<string, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new Error(Errors.USER_NOT_FOUND);

    await this.userRepository.delete(id);
  }
}
