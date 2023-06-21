import { Field, ID, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class UserToken {
  @Field((_type) => ID)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user: User) => user.id)
  @JoinColumn({ name: "userId" })
  public user!: User;

  @Field((_type) => String)
  @Column({
    type: "varchar",
    comment: "api jwt token",
    unique: true,
    length: "1024",
  })
  public apiToken!: string;

  @Field((_type) => Date)
  @CreateDateColumn()
  public createdAt!: Date;

  @Field((_type) => Date)
  @UpdateDateColumn()
  public updatedAt!: Date;
}
