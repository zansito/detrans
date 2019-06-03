import { UserAuthority } from './user.authority';

export class User extends UserAuthority {
  id: number;
  name: string
  email: string;
  username: string;
  password: string;
  enabled: boolean;
  lastPasswordResetDate: Date;
  authorities: any
  admin: boolean;
}
