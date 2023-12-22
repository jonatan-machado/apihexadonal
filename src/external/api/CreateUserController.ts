import CreateUser from '@/core/user/service/CreateUser';
import { Express } from 'express';

export default class CreateUserController {
  constructor(
    private express: Express,
    private createUser: CreateUser,
    ...midlewares: any[]
  ) {
    express.post('/api/v1/user/register', ...midlewares, async (req, res) => {
      try {
        const user = await createUser.execute({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        res.status(201).send();
      } catch (error: any) {
        console.log(error);
        res.status(400).send(error.message);
      }
    });
  }
}
