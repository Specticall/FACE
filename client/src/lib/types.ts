export type SkinType = "Normal" | "Oily" | "Combination" | "Dry";

export type APIResponse<T = unknown> = {
  status: "success" | "error";
  data: T;
};

export type Diagnosis = {
  id: number;
  score: 60;
  age: 25;
  type: SkinType;
  imgURL: string;
  date_created: string;
  concerns: {
    name: string;
    summary: string;
    location: string;
  }[];
};
