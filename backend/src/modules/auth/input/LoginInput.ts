import { Field, InputType } from "type-graphql";
import { User } from "../../../models/User";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  public email!: string;

  @Field()
  public password!: string;
}
