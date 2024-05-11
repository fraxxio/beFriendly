import { Reply, X } from 'lucide-react';
import { Message } from '../../types/messages';

type ReplyOverlayProps = {
  message: Message;
  setReply: React.Dispatch<React.SetStateAction<number>>;
};

export default function ReplyOverlay({ message, setReply }: ReplyOverlayProps) {
  return (
    <div className='absolute top-[105%] w-full bg-primary flex items-center gap-1 p-1 border-l-2 border-r-2 border-b-2 border-secondary rounded-br rounded-bl'>
      <Reply size={18} className='rotate-180 font-semibold' />
      <p className='font-semibold'>Replying to: {message.name}</p>
      <p className='pl-2 truncate max-w-[32rem]'>{message.text}</p>
      <button
        type='button'
        onClick={() => setReply(-1)}
        className='ml-auto hover:text-red-600 duration-200'
      >
        <X size={20} />
      </button>
    </div>
  );
}
