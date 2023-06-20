import { IsEmail, IsNotEmpty } from "class-validator";
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
  public password!: string;
}
