import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Product extends Model<"Products"> {
  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  price!: number;

  @Column
  description?: string;
}
