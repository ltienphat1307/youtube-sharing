import { Field, InputType } from "type-graphql";

@InputType()
export class ShareMovieInput {
  @Field()
  public url!: string;
}
