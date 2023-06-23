import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Field, InputType } from "type-graphql";
import { User } from "../../../models/User";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @Field()
  @IsNotEmpty()
  @MinLength(6)
  public password!: string;
}
