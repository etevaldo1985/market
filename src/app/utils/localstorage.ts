
export class LocalStorageUtils  {



  public getUser() {
    return JSON.parse(localStorage.getItem('user.id'));
  }

  public saveLocalDataUser(response: any) {
    this.saveUserToken(response.accessToken);
    this.saveUser(response.userToken);
  }

  public cleanLocalDataUser() {
    localStorage.removeItem('token.secret');
    localStorage.removeItem('user.id');
  }

  public getUserToken(): string {
    return localStorage.getItem('token.secret');
  }


  public saveUserToken(token: string) {
      localStorage.setItem('token.secret', token);
    }

    public saveUser(user: string) {
      localStorage.setItem('user.id', JSON.stringify(user));
      }


}
