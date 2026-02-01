import { Table, Column, Model, HasMany } from "sequelize-typescript";
import { User } from "./user.js";

@Table
export class Role extends Model<Role> {
  @Column
  name!: string;

  @HasMany(() => User, { foreignKey: "roleId", as: "users" })
  users?: User[];
}
