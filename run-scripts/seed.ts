import { Db } from '../libs/db';
import { config } from '../config';
import { User, Role } from '../libs/db/models';
import { IRole } from '../libs/db/models/role';
import { IUser } from '../libs/db/models/user';

const db = new Db();
db.connection.once('open', ( err ) => {
  if ( err ) {
    throw err;
  }
  console.log(`Mongoose connected to ${config.mongoose.host}`);
  seed();
});
db.init();


const roles: IRole[] = [
  { name: 'admin' },
  { name: 'user', default: true }
];

const adminData: IUser = {
  email: 'admin@localhost.com',
  username: 'admin',
  password: '123456',
  role: []
};

async function seed() {
  try {
    await Role.dropCollection();
    const createdRoles = await Role.createRole(roles);
    const admin = await User.findOneByQuery({ username: 'admin' });
    if ( !admin ) {
      adminData.role.push(createdRoles[ 0 ]._id);
      const createdAdmin = await User.createUser(adminData);
      console.log(createdAdmin);
    }

  } catch ( err ) {
    throw err;
  }
}
