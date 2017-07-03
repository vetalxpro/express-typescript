import { Schema, Document, model } from 'mongoose';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import * as Bluebird from 'bluebird';
import { config } from '../../../config';


export interface IUser {
  _id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string[];
  google?: {
    id?: string,
    accessToken?: string,
    displayName?: string,
    email?: string,
    photo?: string
  };
  facebook?: {
    id?: string,
    accessToken?: string,
    displayName?: string,
    email?: string
  };
  twitter?: {
    id?: string,
    accessToken?: string,
    displayName?: string,
    email?: string,
    photo?: string
  };
  vkontakte?: {
    id?: string,
    accessToken?: string,
    displayName?: string,
  };
  updatedAt?: Date;
  createdAt?: Date;
}

interface IUserMethods {
  checkPassword?: ( plainPassword: string ) => Promise<boolean>;
  generateJwt?: () => Bluebird<string>;
}

export interface IUserDocument extends IUser, IUserMethods, Document {
  _id: string;
}

const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      default: null
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: null
    },
    password: {
      type: String,
      select: false,
      trim: true,
      minlength: 6
    },
    confirmed: {
      type: Boolean,
      default: false
    },
    role: {
      type: [ String ],
      default: [ 'user' ],
      select: false
    },
    google: {
      id: String,
      accessToken: String,
      displayName: String
    },
    facebook: {
      id: String,
      accessToken: String,
      displayName: String
    },
    twitter: {
      id: String,
      accessToken: String,
      displayName: String
    },
    vkontakte: {
      id: String,
      accessToken: String,
      displayName: String
    }
  },
  {
    timestamps: true
  }
);
/**
 * Schema Hooks
 */
userSchema.pre('save', async function( next ) {

  try {
    const user = this as IUserDocument;
    if ( !user.password ) {
      return next();
    }

    user.password = await hash(user.password, 10);
    return next();

  } catch ( err ) {
    next(err);
  }
});

/**
 *
 * Schema Methods
 */
userSchema.methods = {

  checkPassword( plainPassword: string ): Promise<boolean> {

    return compare(plainPassword, this.password);
  },

  generateJwt(): Bluebird<string> {

    const user = this as IUserDocument;
    return Bluebird.fromCallback(( callback ) => {
      return sign({ id: user._id }, config.jwt.secret, config.jwt.options, callback);
    });
  }
};

const UserModel = model<IUserDocument>('User', userSchema);

export class User {

  public static findAll() {
    return UserModel.find();
  }

  public static createUser( user: IUser ) {
    return UserModel.create(user);
  }

  public static findById( id: string ) {
    return UserModel.findById(id);
  }

  public static findByEmail( email: string ) {
    return UserModel.findOne({ email });
  }

  public static updateById( id: string, update: IUser ) {
    return UserModel.findByIdAndUpdate(id, update, { new: true });
  }

  public static replaceById( id: string, update: IUser ) {
    return UserModel.findByIdAndUpdate(id, update, { new: true });
  }

  public static removeById( id: string ) {
    return UserModel.findByIdAndRemove(id);
  }

  public static async findOrCreate( query: object, update: IUser ) {
    const user = await UserModel.findOne(query);
    if ( user ) {
      return user;
    }
    return UserModel.create(update);
  }

  private user: IUserDocument;

  constructor( user: IUser ) {
    this.user = new UserModel(user);
  }

  public get document() {
    return this.user;
  }

}
