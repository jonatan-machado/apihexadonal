import { Request, Response, NextFunction } from 'express';
import ProviderJwt from './ProviderJwt';
import User from '../../core/user/model/User';
import UserRepository from '../../core/user/service/UserRepository';

export default function UserMiddleware(repository: UserRepository) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const acessDenied = () => res.status(403).send('Token Invalid');

    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      acessDenied();
      return;
    }

    const providerJwt = new ProviderJwt(process.env.JWT_SECRET!);

    const userToken = providerJwt.verify(token) as User;
    if (!userToken) {
      acessDenied();
      return;
    }

    (req as any).user = userToken;
    next();
  };
}
