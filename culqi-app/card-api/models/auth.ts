const savedPKs = ['pk_test_LsRBKejzCOEEWOsw'];

export class Auth {
  pkKey: string;

  constructor(key: string) {
    this.pkKey = key;
  }

  async validateAuthentication(): Promise<boolean> {
    //Here we validate if the pk key exists, if match the corresponding stage env, format, etc.
    //for simplicity we are going to validate if exits
    return new Promise((resolve) => {
      if (savedPKs.findIndex((val) => val === this.pkKey) < 0) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }
}
