import { Table, Column, Model } from "sequelize-typescript";

@Table
export class Product extends Model<Product> {
  @Column({ allowNull: false })
  name!: string;

  @Column({ allowNull: false })
  price!: number;

  @Column
  description?: string;
}
