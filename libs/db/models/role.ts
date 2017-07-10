import { Schema, Document, model } from 'mongoose';

export interface IRole {
  _id?: string;
  name?: string;
  default?: boolean;
}

interface IRoleDocument extends IRole, Document {
  _id: string;
}

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    default: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const RoleModel = model<IRoleDocument>('Role', roleSchema);

export class Role {
  public static getAll() {
    return RoleModel.find();
  }

  public static findDefaultRoles() {
    return RoleModel.find({ default: true });
  }

  public static createRole( role: IRole | IRole[] ) {
    return RoleModel.create(role);
  }

  public static dropCollection() {
    return RoleModel.collection.drop();
  }

  private role: IRoleDocument;

  constructor( role: IRole ) {
    this.role = new RoleModel(role);
  }

  public get document() {
    return this.role;
  }
}
