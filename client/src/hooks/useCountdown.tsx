import { useEffect, useState } from 'react';

const useCountdown = (
  initialTime: number,
  setIsReadyToChat: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = ('0' + Math.floor(timeRemaining / 60)).slice(-2);
  const seconds = ('0' + (timeRemaining % 60)).slice(-2);
  const isOver = minutes === '00' && seconds === '00' ? true : false;

  useEffect(() => {
    if (isOver) {
      setTimeout(() => {
        setIsReadyToChat(true);
      }, 1800);
    }
  }, [isOver, setIsReadyToChat]);

  return { minutes, seconds, isOver };
};

export { useCountdown };
