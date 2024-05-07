import { SendHorizontal } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import { Tusernames } from '../types/user';
import { Tprogress } from '../types/questions';

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

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userInput !== '') {
      socket.emit('message', {
        name: usernames.username,
        text: userInput,
      });
      setUserInput('');
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

    msgInput.addEventListener('keypress', () => {
      socket.emit('activity', usernames.username);
    });

    socket.on('answerProgress', (progress) => {
      if (progress.username !== usernames.username) {
        setFriendProgress(progress.array);
      }
    });

    let activityTimer = 0;
    socket.on('activity', (name) => {
      setActivity(`${name} is typing...`);

      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setActivity('');
      }, 3000);
    });

    return () => {
      socket.off('message');
      socket.off('activity');
    };
  }, []);
  return (
    <section className='h-[70vh] container border-2 border-secondary rounded flex'>
      <div className='w-[35%] border-r-2 border-secondary'>
        <div className='flex border-b-2 border-secondary h-8'>
          <p className='text-lg text-center border-r-2 border-secondary w-full bg-primary'>
            {usernames.username} answers
          </p>
          <p className='text-lg text-center w-full bg-primary'>
            {usernames.friendUsername} answers
          </p>
        </div>
        <div className='max-h-[95%] overflow-y-scroll'>
          {answers.map((element, index) => {
            return (
              <div className='border-b border-secondary border-opacity-20 last:border-b-0 py-2'>
                <p className='py-1 px-2'>
                  {index + 1}. {element.question}
                </p>
                <div className='flex text-center pt-2'>
                  <p className='w-full'>{element.answer}</p>
                  <p className='w-full'>{friendAnswers[index].answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-[65%] flex flex-col'>
        <div className='grow relative'>
          {messages.map((msg) => {
            return (
              <div key={msg.time}>
                {msg.name} {msg.text} {msg.time}
              </div>
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
    </section>
  );
}
