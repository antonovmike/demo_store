import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "./user.js";
import { Optional } from "sequelize";

interface RoleAttributes {
  id: number;
  name: string;
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

@Table
export class Role
  extends Model<RoleAttributes, RoleCreationAttributes>
  implements RoleAttributes
{
  id!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name!: string;

  @HasMany(() => User, { foreignKey: "roleId", as: "users" })
  users?: User[];
}
