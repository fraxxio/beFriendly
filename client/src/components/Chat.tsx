import { SendHorizontal } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Tusernames } from '../types/user';
import { Tprogress } from '../types/questions';
import Message from './ui/Message';

type Messages = {
  name: string;
  text: string;
  time: string;
}[];

type ChatProps = {
  socket: Socket;
  usernames: Tusernames;
  friendAnswers: Tprogress;
  setFriendProgress: React.Dispatch<React.SetStateAction<Tprogress>>;
  answers: {
    question: string;
    answer: string;
  }[];
};

export default function Chat({
  socket,
  usernames,
  friendAnswers,
  answers,
  setFriendProgress,
}: ChatProps) {
  const [messages, setMessages] = useState<Messages>([]);
  const [userInput, setUserInput] = useState('');
  const [activity, setActivity] = useState('');
  const messageContainerRef = useRef<HTMLDivElement>(null);

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userInput !== '') {
      socket.emit('message', {
        name: usernames.username,
        text: userInput,
      });
      setUserInput('');
      socket.emit('activity', { name: usernames.username, key: 'Enter' });
    }
  }

  useEffect(() => {
    const msgInput = document.querySelector('#msgInput') as HTMLInputElement;

    socket.on('message', (data) => {
      const { name, text, time } = data;
      const newMessage = {
        name: name,
        text: text,
        time: time,
      };
      setMessages((prevMsg) => [...prevMsg, newMessage]);
    });

    msgInput.addEventListener('keypress', (event: KeyboardEvent) => {
      socket.emit('activity', { name: usernames.username, key: event.key });
    });

    socket.on('answerProgress', (progress) => {
      if (progress.username !== usernames.username) {
        setFriendProgress(progress.array);
      }
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
    };
  }, []);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <section className='container'>
      <div className='border-2 border-secondary rounded flex h-[80vh]'>
        <div className='w-[35%] border-r-2 border-secondary flex flex-col'>
          <div className='flex border-b-2 border-secondary items-center bg-primary h-fit'>
            <p className='text-lg text-center w-full'>{usernames.username}</p>
            <div className='border border-secondary h-full'></div>
            <p className='text-lg text-center w-full'>{usernames.friendUsername}</p>
          </div>
          <div className='max-h-full overflow-y-scroll'>
            {answers.map((element, index) => {
              return (
                <div
                  key={index}
                  className='border-b border-secondary border-opacity-20 last:border-b-0 py-2'
                >
                  <p className='py-1 px-2'>
                    {index + 1}. {element.question}
                  </p>
                  <div className='flex text-center pt-2 items-center'>
                    <p className='w-full'>{element.answer}</p>
                    <p className='w-full'>{friendAnswers[index].answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='w-[65%] flex flex-col'>
          <div className='grow relative p-4 overflow-auto' ref={messageContainerRef}>
            {messages.map((msg, index) => {
              return (
                <Message
                  key={index}
                  time={msg.time}
                  text={msg.text}
                  name={msg.name}
                  isRightSide={msg.name === usernames.username}
                  isRepeating={messages[index - 1]?.name === msg.name}
                />
              );
            })}
            {activity && (
              <p className='absolute bottom-1 left-4 text-sm text-gray-700 animate-pulse'>
                {activity}
              </p>
            )}
          </div>
          <form className='flex' onSubmit={sendMessage}>
            <input
              type='text'
              id='msgInput'
              value={userInput}
              placeholder='Say something...'
              onChange={(e: FormEvent<HTMLInputElement>) => setUserInput(e.currentTarget.value)}
              className='border-t-2 border-secondary w-full pl-4 py-2 focus:outline-none ring-inset focus:ring ring-primary duration-200'
            />
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
