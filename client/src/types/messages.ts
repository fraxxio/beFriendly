export type Messages = {
  name: string;
  text: string;
  time: string;
  reaction: string;
  userId: string;
  replyingTo: number;
}[];

export type Message = {
  name: string;
  text: string;
  time: string;
  reaction: string;
  userId: string;
  replyingTo: number;
};
