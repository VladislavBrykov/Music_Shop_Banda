export interface Users {
  getUsers(phoneEmail: string): Promise<unknown>;
  registration(phoneEmail: string, password: string): Promise<unknown>;
  login(phoneEmail: string, password: string): Promise<unknown>;
  refreshToken(token: string): Promise<unknown>;
}

export interface Musics {
  allMusic(): Promise<unknown>;
  soundFromBasket(id_user: number, root: boolean): Promise<unknown>;
  saveSoundForUser(email: string): Promise<unknown>;
  soundToBasket(id_user: number, id_music: number): Promise<unknown>;
  finalPriceByEmail(email: string): Promise<unknown>;

  musicOnMain(): Promise<unknown>;
}
