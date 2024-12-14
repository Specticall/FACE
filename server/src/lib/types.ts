export type GoogleProfile = {
  sub: string;
  name: string;
  given_name: string;
  picture: string;
  email: string;
  email_verified: string;
};

export type JWTPayload = {
  userId: number;
  username: string;
  email: string;
};

export type SkinType = "Normal" | "Oily" | "Combination" | "Dry";

export type Diagnosis = {
  skin_score: 60;
  skin_age: 25;
  skin_type: SkinType;
  concerns: {
    name: string;
    summary: string;
    location: string;
  }[];
};

export type DetectionData = Diagnosis | { message: string };
