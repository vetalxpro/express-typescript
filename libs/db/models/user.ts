import { mongoose } from '../db';
import { Schema, Document } from 'mongoose';
import { hash, compare } from 'bcrypt';

export interface IUser {
  _id?: string;
  local?: {
    username?: string;
    email?: string;
    password?: string;
  };
  role?: string[];
  google?: {
    id?: string,
    token?: string,
    name?: string,
    email?: string
  };
  updatedAt?: Date;
  createdAt?: Date;
}

export interface IUserDocument extends IUser, Document {
  _id: string;
}

const userSchema: Schema = new Schema(
  {
    local: {
      username: {
        type: String,
        default: null
      },
      email: {
        type: String,
        unique: true
      },
      password: {
        type: String,
        default: null,
        select: false
      },
      confirmed: {
        type: Boolean,
        default: false
      }
    },
    role: {
      type: [ String ],
      default: [ 'user' ],
      select: false
    },
    google: {
      id: {
        type: String,
        default: null
      },
      token: {
        type: String,
        default: null
      },
      email: {
        type: String,
        default: null
      },
      name: {
        type: String,
        default: null
      }
    }
  },
  { timestamps: true }
);

export class User {
  public static model = mongoose.model<IUserDocument>('User', userSchema);

  public static getUsers() {
    return User.model.find();
  }

  public static createUser( user: IUser ) {
    return hash(user.local.password, 10)
      .then(( hash ) => {
        user.local.password = hash;
        return User.model.create(user);
      });
  }

  public static findById( id: string ) {
    return User.model.findById(id);
  }

  public static findByEmail( email: string ) {
    return User.model.findOne({ 'local.email': email });
  }

  public static updateById( id: string, update: IUser ) {
    return User.model.findByIdAndUpdate(id, update, { new: true });
  }

  public static removeById( id: string ) {
    return User.model.findByIdAndRemove(id);
  }

  public static checkPassword( plain: string, hash: string ): Promise<boolean> {
    return compare(plain, hash);
  }

  public static updateOrCreate( query: IUser | any, update: IUser | any ) {
    return User.model.findOneAndUpdate(query, update, { upsert: true, new: true });
  }

}
