import { Reply } from 'lucide-react';
import { Message as TMessage } from '../../types/messages';
import ReactionEmoji from './ReactionEmoji';
import ReplyBtn from './ReplyBtn';
import React from 'react';

type MessageProps = {
  time: string;
  name: string;
  text: string;
  isRightSide: boolean;
  isRepeating: boolean;
  id: number;
  reaction: string;
  setReply: React.Dispatch<React.SetStateAction<number>>;
  replyingTo: number;
  replyMsg: TMessage | null;
};

export default function Message({
  text,
  time,
  name,
  isRightSide,
  isRepeating,
  id,
  reaction,
  setReply,
  replyingTo,
  replyMsg,
}: MessageProps) {
  if (name === 'Admin') {
    return (
      <div className='max-w-[40rem] first:mt-0 mt-6 flex gap-2 items-center'>
        <p className='text-sm'>{time}: </p>
        <p>{text}</p>
      </div>
    );
  }

  const scrollToReplyMessage = (replyingToIndex: number) => {
    const messageElement = document.getElementById(`message-${replyingToIndex}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageElement.classList.replace('border-secondary', 'border-primary');
      setTimeout(() => {
        messageElement.classList.replace('border-primary', 'border-secondary');
      }, 1500);
    }
  };

  return (
    <div
      id={`message-${id}`}
      className={`max-w-[20rem] relative overflow-visible first:mt-0 group shadow-md shadow-gray-400 
      ${isRightSide && 'ml-auto'} 
      ${
        isRepeating
          ? 'border-b-2 border-l-2 border-r-2 -mt-0.5 border-secondary rounded-br rounded-bl'
          : 'mt-6 border-2 border-secondary rounded'
      }
      ${replyingTo >= 0 ? 'mt-[6rem]' : null}`}
    >
      {replyingTo >= 0 && (
        <button
          type='button'
          onClick={() => scrollToReplyMessage(replyingTo)}
          className={`absolute hover:cursor-pointer w-full -top-[110%] max-w-[18rem] ${
            isRightSide ? 'right-0 ' : 'left-0 '
          }`}
        >
          <p className='text-sm flex items-center gap-1 text-gray-500'>
            <Reply size={16} className='rotate-180' />
            Replied:
          </p>
          <div
            className={`w-full overflow-visible first:mt-0 group ${
              isRightSide && 'ml-auto'
            } border-l-2 border-r-2 border-t-2 border-secondary rounded `}
          >
            <div className='flex justify-between items-center bg-primary border-b-2 border-secondary p-1'>
              <p className='text-sm'>{replyMsg?.name}</p>
              <p className='text-xs'>{replyMsg?.time}</p>
            </div>
            <div className='relative'>
              <p className='px-1 py-1 truncate text-sm text-left'>{replyMsg?.text}</p>
              <div className='gradient absolute bottom-0 w-full h-full'></div>
            </div>
          </div>
        </button>
      )}
      {!isRepeating && (
        <div className='flex justify-between items-center bg-primary border-b-2 border-secondary p-1'>
          <p>{name}</p>
          <p className='text-xs'>{time}</p>
        </div>
      )}
      <div className='relative'>
        <p className='px-1 py-2'>{text}</p>
        {reaction && (
          <p className='absolute -right-2 -bottom-3 bg-secondary rounded-full px-1'>{reaction}</p>
        )}
        {!isRightSide && <ReactionEmoji id={id} />}
        <ReplyBtn id={id} setReply={setReply} isRightSide={isRightSide} />
      </div>
    </div>
  );
}
