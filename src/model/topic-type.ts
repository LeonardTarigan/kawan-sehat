import { IPagination } from "./general-type";

export interface ITopic {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface ITopicList extends IPagination {
  topics: ITopic[];
}
