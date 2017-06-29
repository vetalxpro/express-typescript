import { Router } from 'express';
import { deleteUserById, getUserById, getUsers, loginUser, registerUser, putUser } from './controllers';
import { checkObjectId } from '../../../middleware';


class UsersApi {
  public router = Router();

  public init() {
    this.initRoutes();
    return this.router;
  }

  private initRoutes() {
    this.router.get('/users', getUsers);
    this.router.post('/users/registration', registerUser);
    this.router.post('/users/login', loginUser);

    this.router.route('/users/:id')
      .get(checkObjectId, getUserById)
      .put(checkObjectId, putUser)
      .delete(checkObjectId, deleteUserById);

  }
}

export const usersApi = new UsersApi().init();
