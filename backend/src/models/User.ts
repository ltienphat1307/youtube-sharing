import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field((_type) => String)
  @Column({
    type: "varchar",
    unique: true,
  })
  public email!: string;

  @Field((_type) => String)
  @Column({ type: "varchar" })
  public password!: string;

  @Field((_type) => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @Field((_type) => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;
}
