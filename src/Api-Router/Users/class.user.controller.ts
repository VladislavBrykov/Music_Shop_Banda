import { Request, Response } from 'express';
import { injectable, inject, Container } from 'inversify';
import 'reflect-metadata';
import { Users } from '../../interfaces';
import { TYPES } from '../../types';
import valid from '../../Helpers/incoming.data.validator';
import path from 'path';
import { ErrorsForUser } from '../../Constants/errors';
import { hashPassword } from '../../Helpers/hash.password';

@injectable()
class UserController {
  private capacityUser: { myContainer: Container; userService: Users };

  constructor(
    @inject(TYPES.Users)
    userService: {
      myContainer: Container;
      userService: Users;
    }
  ) {
    this.capacityUser = userService;
  }

  loginPage = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../../views', '/my-account.html'));
  };

  allUsers = async (req: Request, res: Response) => {
    await valid.allUsersInputData(req.body);
    const { phoneEmail } = req.body;
    const users = await this.capacityUser.userService.getUsers(phoneEmail);
    if (!users) {
      throw new Error(ErrorsForUser.SearchUser);
    }
    return res.status(200).json({ users });
  };

  registration = async (req: Request, res: Response) => {
    await valid.registrationLoginInputData(req.body);
    const { password, phoneEmail } = req.body;
    const registerUser = await this.capacityUser.userService.registration(
      phoneEmail,
      password
    );
    if (!registerUser) {
      throw new Error(ErrorsForUser.UserExists);
    }
    return res.status(200).json({ registerUser });
  };

  login = async (req: Request, res: Response) => {
    await valid.registrationLoginInputData(req.body);
    const { password, email } = req.body;
    const loginUser: any = await this.capacityUser.userService.login(
      email,
      password
    );
    if (!loginUser.status) {
      throw new Error(ErrorsForUser.AuthorizationError);
    }
    return res.status(200).json({ loginUser });
  };

  refreshToken = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const jwtToken = await this.capacityUser.userService.refreshToken(token);

    if (!jwtToken) {
      res.redirect('/my-account');
    }
    return res.status(200).json({ jwtToken });
  };
}

export default UserController;
