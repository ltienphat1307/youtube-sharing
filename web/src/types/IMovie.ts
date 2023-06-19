import { IUser } from "./IUser";

export interface IMovie {
  id: number;
  title: string;
  url: string;
  description: string;
  sharedByUser: IUser;
  videoId: string;
}
