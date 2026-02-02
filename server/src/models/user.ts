import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./role.js";
import { Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
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

  @Column({ allowNull: false, unique: true })
  username!: string;

  @Column({ allowNull: false })
  password_hash!: string;

  @ForeignKey(() => Role)
  @Column({ allowNull: false })
  roleId!: number;

  @BelongsTo(() => Role, { as: "role" })
  role?: Role;
}
