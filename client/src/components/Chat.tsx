import { SendHorizontal } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type Messages = {
  name: string;
  text: string;
  time: string;
}[];

type ChatProps = {
  socket: Socket;
  username: string;
};

export default function Chat({ socket, username }: ChatProps) {
  const [messages, setMessages] = useState<Messages>([]);
  const [userInput, setUserInput] = useState('');
  const [activity, setActivity] = useState('');

  function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userInput !== '') {
      socket.emit('message', {
        name: username,
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
      socket.emit('activity', username);
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
      <div className='w-[30%] border-r-2 border-secondary'>Answers to questions</div>
      <div className='w-[70%] flex flex-col'>
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
