import DeleteUser from '../../core/user/service/DeleteUser';
import { Express } from 'express';

export default class DeleteUserController {
  constructor(
    private express: Express,
    private deleteUser: DeleteUser,
    ...midlewares: any[]
  ) {
    express.delete('/api/v1/user/:id', ...midlewares, async (req, res) => {
      try {
        await this.deleteUser.execute(req.params.id);
        res.status(200).send();
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    });
  }
}
