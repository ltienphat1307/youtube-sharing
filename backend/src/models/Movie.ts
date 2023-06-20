import { Field, ObjectType } from "type-graphql";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Movie {
  @Field((_type) => Number)
  @PrimaryGeneratedColumn()
  public readonly id!: number;

  @Field()
  @Column({
    type: "varchar",
  })
  public videoId!: string;

  @Field()
  @Column()
  public title!: string;

  @Field()
  @Column({ type: "text" })
  public description!: string;

  @Field((_type) => User)
  @ManyToOne((_type) => User, (user: User) => user.id)
  @JoinColumn({ name: "userId" })
  public sharedByUser!: User;

  @Field()
  @CreateDateColumn()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  public updatedAt!: Date;
}
