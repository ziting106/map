//#region Auth
export interface Auth {
  Account: string;
  Password: string;
  DeviceCode: string;
}
export interface AuthResult {
  Success: boolean;
  Code: string;
  Message: string;
  DataTime: string;
  Data: {
    UserId: string;
    UserCode: string;
    UserName: string;
    Token: string;
    Verified: string;
  };
}

export interface ChangeMima {
  Code: string;
  OldMima?: string;
  NewMima?: string;
  VerifyKey?: String;
  Verified?: string;
  isAdmin?: boolean;
}

export interface ChangeMimaResult {
  Success: Boolean;
  Code: string;
  Message: string;
  DataTime: string;
  Data: ChangeMima;
}

//#endregion
