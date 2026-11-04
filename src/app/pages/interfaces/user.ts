export interface User {
  Type: string;
  exp: number;
  family_name: string;
  iat: number;
  nameid: string | number;
  nbf: number;
  role: string;
  unique_name: string;
}
export class UserModel implements User {
  Type: string = '';
  exp: number = 0;
  family_name: string = '';
  iat: number = 0;
  nameid: string | number = 0;
  nbf: number = 0;
  role: string = '';
  unique_name: string = '';
}
