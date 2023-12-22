import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import CreateUser from './core/user/service/CreateUser';
import CreateUserController from './external/api/CreateUserController';
import LoginUser from './core/user/service/LoginUser';
import LoginUserController from './external/api/LoginUserController';
import UserMiddleware from './external/api/UserMiddleware';
import UserEntity from './external/db/UserEntity';
import PasswordCripto from './external/auth/passwordCripto';

const app = express();
const port = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// ------------------------------------ Open Routes

const userEntity = new UserEntity();
const passwordCrypt = new PasswordCripto();
const createUser = new CreateUser(userEntity, passwordCrypt);
const loginUser = new LoginUser(userEntity, passwordCrypt);

new LoginUserController(app, loginUser);

// ------------------------------------ Closed Routes
const userMid = UserMiddleware(userEntity);
new CreateUserController(app, createUser, userMid);
