import LoginUser from '../../core/user/service/LoginUser';
import { Express } from 'express';
import ProviderJwt from './ProviderJwt';

export default class LoginUserController {
  constructor(private express: Express, private loginUser: LoginUser) {
    express.post('/api/v1/users/login', async (req, res) => {
      try {
        const user = await this.loginUser.execute({
          email: req.body.email,
          password: req.body.password,
        });
        const token = new ProviderJwt(process.env.JWT_SECRET!).generate({
          id: user.id,
          email: user.email,
        });
        res.status(200).send({ token });
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
