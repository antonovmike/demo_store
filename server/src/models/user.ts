import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Role } from "./role.js";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password_hash: string;
  roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

@Table
export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  username!: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password_hash!: string;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId!: number;

  @BelongsTo(() => Role, { as: "role" })
  role?: Role;
}
