import { SendHorizontal } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Tusernames } from '../types/user';
import { Tprogress, Tquestions } from '../types/questions';
import Message from './ui/Message';
import EmojiMenu from './ui/EmojiMenu';
import ReplyOverlay from './ui/ReplyOverlay';
import { Messages } from '../types/messages';

type ChatProps = {
  socket: Socket;
  usernames: Tusernames;
  friendAnswers: Tprogress;
  setFriendProgress: React.Dispatch<React.SetStateAction<Tprogress>>;
  questions: Tquestions;
  userId: string | undefined;
  answers: {
    question: string;
    answer: string;
  }[];
  isFriendReady: boolean;
  setIsFriendReady: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Chat({
  socket,
  usernames,
  friendAnswers,
  answers,
  setFriendProgress,
  questions,
  userId,
  isFriendReady,
  setIsFriendReady,
}: ChatProps) {
  const [messages, setMessages] = useState<Messages>([
    {
      name: 'beFriendly',
      text: 'Say hi to your new friend!',
      time: '',
      reaction: '',
      userId: 'beFriendly_Admin',
      replyingTo: -1,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [activity, setActivity] = useState('');
  const [reply, setReply] = useState(-1);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userInput !== '') {
      socket.emit('message', {
        name: usernames.username,
        text: userInput,
        replyingTo: reply,
      });
      setUserInput('');
      setReply(-1);
      socket.emit('activity', { name: usernames.username, key: 'Enter' });
    }
  }

  useEffect(() => {
    const msgInput = document.querySelector('#msgInput') as HTMLInputElement;

    socket.on('message', (data) => {
      const { name, text, time, id, replyingTo } = data;
      const newMessage = {
        name: name,
        text: text,
        time: time,
        reaction: '',
        userId: id,
        replyingTo: replyingTo,
      };
      setMessages((prevMsg) => [...prevMsg, newMessage]);
    });

    socket.on('addReaction', (data) => {
      console.log('test: ', data.emoji);

      const { id, emoji } = data;
      setMessages((prevMsg) => {
        return prevMsg.map((message, index) => {
          if (index === id) {
            return { ...message, reaction: message.reaction === emoji ? '' : emoji };
          }
          return message;
        });
      });
    });

    msgInput.addEventListener('keypress', (event: KeyboardEvent) => {
      socket.emit('activity', { name: usernames.username, key: event.key });
    });

    socket.on('answerProgress', (progress) => {
      if (progress.username !== usernames.username) {
        setFriendProgress(progress.array);
      }
    });

    socket.on('disconnected', () => {
      setFriendProgress((prevState) => [...prevState, { question: 'disconnected', answer: '' }]);
    });

    socket.on('isReadyToChat', () => {
      setIsFriendReady(true);
    });

    let activityTimer = 0;
    socket.on('activity', ({ name, key }) => {
      if (key !== 'Enter') {
        setActivity(`${name} is typing...`);
        clearTimeout(activityTimer);
        activityTimer = setTimeout(() => {
          setActivity('');
        }, 2000);
      } else {
        setActivity('');
      }
    });

    return () => {
      socket.off('message');
      socket.off('activity');
      socket.off('answerProgress');
      socket.off('addReaction');
      socket.off('disconnected');
      socket.off('isReadyToChat');
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className='container max-[850px]:mb-10'>
      <div className='border-2 border-secondary rounded flex h-[80vh] max-[850px]:border-none max-[850px]:gap-20 max-[850px]:h-full max-[850px]:my-4 max-[850px]:flex-col-reverse'>
        <div className='w-[35%] border-r-2 border-secondary flex flex-col max-[850px]:w-full max-[850px]:border-2 max-[850px]:rounded'>
          <div className='flex border-b-2 border-secondary items-center bg-primary h-fit'>
            <p className='text-lg text-center w-1/2 py-2 px-1'>
              {usernames.username}{' '}
              {friendAnswers[friendAnswers.length - 1].question === 'disconnected' &&
                '(Disconnected)'}
            </p>
            <div className='border border-secondary h-full py-2'></div>
            <p className='text-lg text-center w-1/2 py-2 px-1'>{usernames.friendUsername}</p>
          </div>
          <div className='max-h-full overflow-y-auto'>
            {questions.map((question, index) => {
              return (
                <div
                  key={index}
                  className='border-b border-secondary border-opacity-20 last:border-b-0 py-2'
                >
                  <p className='py-1 px-2'>
                    {index + 1}. {question.question}
                  </p>
                  <div className='flex text-center pt-2 items-center'>
                    <p className='w-full'>{answers[index].answer || '-'}</p>
                    <p className='w-full'>{friendAnswers[index].answer || '-'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-[65%] flex flex-col max-[850px]:w-full max-[850px]:min-h-[80vh] max-[850px]:border-2 max-[850px]:border-secondary max-[850px]:rounded'>
          <div
            className='grow relative p-4 overflow-auto overflow-x-hidden'
            ref={messageContainerRef}
          >
            {messages.map((msg, index) => {
              return (
                <Message
                  key={index}
                  id={index}
                  time={msg.time}
                  text={msg.text}
                  name={msg.name}
                  reaction={msg.reaction}
                  isRightSide={msg.name === usernames.username && msg.userId === userId}
                  isRepeating={
                    messages[index - 1]?.name === msg.name &&
                    messages[index - 1].userId === msg.userId &&
                    msg.replyingTo < 0
                  }
                  setReply={setReply}
                  replyingTo={msg.replyingTo}
                  replyMsg={msg.replyingTo >= 0 ? messages[msg.replyingTo] : null}
                />
              );
            })}
            {activity && (
              <p className='absolute bottom-1 left-4 text-sm text-gray-700 animate-pulse'>
                {activity}
              </p>
            )}
          </div>
          <form className='flex relative' onSubmit={sendMessage}>
            <EmojiMenu setUserInput={setUserInput} />
            <div className='relative w-full'>
              <input
                type='text'
                id='msgInput'
                value={userInput}
                disabled={!isFriendReady}
                placeholder={
                  isFriendReady
                    ? 'Say something...'
                    : `${usernames.friendUsername} hasn't answered yet.`
                }
                onChange={(e: FormEvent<HTMLInputElement>) => setUserInput(e.currentTarget.value)}
                className='border-t-2 border-secondary w-full px-4 py-2 focus:outline-none ring-inset focus:ring ring-primary duration-200'
              />
              {reply >= 0 && <ReplyOverlay setReply={setReply} message={messages[reply]} />}
            </div>
            <button
              type='submit'
              className='px-4 bg-secondary text-primary hover:bg-primary hover:text-secondary duration-200 border-t-2 border-l-2 border-transparent hover:border-secondary'
            >
              <SendHorizontal />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
