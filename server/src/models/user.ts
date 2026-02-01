import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Role } from "./role.js";

@Table
export class User extends Model<"Users"> {
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
