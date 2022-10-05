import { AuthenticatedUser } from './authenticated-user.interface';

export interface UserContext {
  req: {
    user: AuthenticatedUser;
  };
}
