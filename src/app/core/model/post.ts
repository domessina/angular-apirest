import { PartialAssign } from "./partial";

export class Post extends PartialAssign<Post>{
  userId: number;
  id: number;
  title: string;
  body: string;
}
