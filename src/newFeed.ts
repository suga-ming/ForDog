import { SetStateAction } from "react";

export interface ITagContainer {
  tag: string;
  tags: string[];
  setTag: (value: SetStateAction<string>) => void;
  setTags: (value: SetStateAction<string[]>) => void;
}
