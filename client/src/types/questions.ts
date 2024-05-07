export type Tprogress = {
  question: string;
  answer: string;
}[];

export type TarrayState = {
  currQuestion: number;
  questions: {
    question: string;
    answer: string;
  }[];
};

export type Tquestions = {
  question: string;
  answer1: string;
  answer2: string;
}[];
