import User from './entity/User';

export interface Users {
  getUsers(phoneEmail: string): Promise<[User]>;
  registration(phoneEmail: string, password: string): Promise<boolean>;
  login(phoneEmail: string, password: string): Promise<any>;
  refreshToken(token: string): Promise<string>;
}

export interface Musics {
  allMusic(): Promise<object>;
  soundFromBasket(id_user: number, root: boolean): Promise<object>;
  saveSoundForUser(email: string): Promise<boolean>;
  soundToBasket(id_user: number, id_music: number): Promise<object>;
  finalPriceByEmail(email: string): Promise<number>;
  musicOnMain(): Promise<object>;
  saveMusic(
    title: string,
    musician: string,
    price: string,
    category: string,
    description: string,
    image: string
  ): Promise<boolean>;
}

export interface Authorized {
  status: boolean;
}

export interface Token {
  token: string;
}

export interface Login {
  status: boolean;
  tokens: object;
  searchUser: User;
}
