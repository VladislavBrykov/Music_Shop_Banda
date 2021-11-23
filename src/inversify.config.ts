import { Container } from 'inversify';
import { TYPES } from './types';
import { Users } from './interfaces';
import UserService from './Service/Users/users.service.functional';

const myContainer = new Container();
myContainer.bind(TYPES.Users).to(UserService);

const userService = myContainer.get<Users>(TYPES.Users);

export = { myContainer, userService };
