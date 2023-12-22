import User from '../../core/user/model/User';
import db from './db';

export default class UserEntity {
  async save(user: User): Promise<void> {
    await db.query(
      'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)',
      [user.id, user.name, user.email, user.password],
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return !result ? null : result;
  }

  async findById(id: string): Promise<User | null> {
    const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return !result ? null : result;
  }

  async delete(id: string): Promise<void> {
    await db.query('DELETE * FROM users WHERE id = $1', [id]);
  }
}
