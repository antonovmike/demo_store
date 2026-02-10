import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface ProductAttributes {
  id?: number;
  name: string;
  price: number;
  description?: string;
}

export interface ProductCreationAttributes extends Omit<
  ProductAttributes,
  "id"
> {}

@Table
export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;
}
