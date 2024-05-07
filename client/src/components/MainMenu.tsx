import { Dispatch, FormEvent, useEffect, useState } from 'react';
import { Search, User } from 'lucide-react';
import { Socket } from 'socket.io-client';
import { Tusernames } from '../types/user';

type MainMenuProps = {
  setIsPaired: Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  usernames: Tusernames;
  setUsernames: Dispatch<React.SetStateAction<Tusernames>>;
};

export default function MainMenu({ setIsPaired, socket, usernames, setUsernames }: MainMenuProps) {
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  function hSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(usernames.username.toLocaleLowerCase() === 'admin' ? true : false);
    if (usernames.username.toLocaleLowerCase() === 'admin') return;

    setLoading(true);
    socket.emit(
      'looking',
      usernames.username,
      (response: { result: string; friendName: string }) => {
        setUsernames((prevUsernames) => ({
          ...prevUsernames,
          friendUsername: response.friendName,
        }));
        setIsPaired(response.result === 'success' ? true : false);
      }
    );
  }

  useEffect(() => {
    socket.on('activeUsers', ({ users }: { users: number }) => {
      setUserCount(users);
    });

    return () => {
      socket.off('activeUsers');
    };
  }, []);

  return (
    <section className='h-[70vh] container'>
      <h1 className='text-center text-3xl font-semibold'>Let's find new friends!</h1>
      <div className='w-[50%] mx-auto pt-12'>
        <p className='text-center'>
          To start looking for a friend enter your name and click <b>Find Friend</b>. When you
          connect to the room you will need to answer 10 random questions in 2 min and after that
          you will be able to chat and get to know each other.
        </p>
        <form onSubmit={hSubmit} className='flex flex-col gap-2 pt-12 w-[70%] mx-auto text-center'>
          <label htmlFor='nameInput'>Your name:</label>
          <input
            type='text'
            id='nameInput'
            name='name'
            placeholder='John Doe'
            required
            disabled={loading}
            onChange={(e: FormEvent<HTMLInputElement>) => {
              const { value } = e.currentTarget;
              setUsernames((prevUsernames) => ({
                ...prevUsernames,
                username: value,
              }));
            }}
            className='py-2 pl-2 border-2 border-secondary rounded placeholder:text-gray-600 duration-200 focus:outline-primary'
          />
          {error && <p className='text-red-700 text-sm'>This username is not allowed.</p>}
          <button
            type='submit'
            disabled={loading}
            className='mt-4 bg-secondary rounded text-primary font-semibold py-2 hover:bg-primary hover:text-secondary duration-200 disabled:hover:bg-secondary disabled:hover:text-primary'
          >
            {loading ? (
              <div className='flex items-center gap-2 justify-center'>
                Looking for a friend... <Search className='animate-bounce' size={18} />
              </div>
            ) : (
              <div className='flex items-center gap-2 justify-center'>
                Find Friend <Search size={18} />
              </div>
            )}
          </button>
          <p className='flex items-center gap-1 mx-auto pt-4 text-sm'>
            Online: {userCount} <User size={16} />
          </p>
        </form>
      </div>
    </section>
  );
}
