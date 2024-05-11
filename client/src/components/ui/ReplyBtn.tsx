import { Reply } from 'lucide-react';

type ReplyBtnProps = {
  isRightSide: boolean;
  id: number;
  setReply: React.Dispatch<React.SetStateAction<number>>;
};
export default function ReplyBtn({ isRightSide, setReply, id }: ReplyBtnProps) {
  return (
    <button
      type='button'
      onClick={() => setReply(id)}
      className={`btn text-gray-500 absolute top-[50%] -translate-y-1/2 duration-100 opacity-0 group-hover:opacity-100 ${
        isRightSide ? '-left-6' : '-right-12'
      }`}
    >
      <Reply size={18} />
    </button>
  );
}
