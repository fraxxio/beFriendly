import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Loading from './ui/Loading';
import ProgressIndicator from './ui/ProgressIndicator';
import { Tusernames } from '../types/user';
import { TarrayState, Tprogress, Tquestions } from '../types/questions';
import { useCountdown } from '../hooks/useCountdown';
import { Timer } from 'lucide-react';

type QuestionsProps = {
  setIsReadyToChat: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  usernames: Tusernames;
  arrayState: TarrayState;
  setArrayState: React.Dispatch<React.SetStateAction<TarrayState>>;
  friendProgress: Tprogress;
  setFriendProgress: React.Dispatch<React.SetStateAction<Tprogress>>;
  questions: Tquestions;
  setQuestions: React.Dispatch<React.SetStateAction<Tquestions>>;
};

export default function Questions({
  setIsReadyToChat,
  socket,
  usernames,
  arrayState,
  setArrayState,
  friendProgress,
  setFriendProgress,
  questions,
  setQuestions,
}: QuestionsProps) {
  const { minutes, seconds, isOver } = useCountdown(2 * 60, setIsReadyToChat);

  function hUpdateAnswerProgress(question: string, answer: string) {
    const updatedQuestions = arrayState.questions.map((item, index) =>
      index === arrayState.currQuestion ? { question: question, answer: answer } : item
    );
    if (arrayState.currQuestion < 9) {
      setArrayState((prevState) => {
        socket.emit('answerProgress', { array: updatedQuestions, username: usernames.username });

        return {
          currQuestion: prevState.currQuestion + 1,
          questions: updatedQuestions,
        };
      });
    } else {
      setArrayState((prevState) => {
        socket.emit('answerProgress', {
          array: updatedQuestions,
          username: usernames.username,
        });

        return {
          currQuestion: prevState.currQuestion + 1,
          questions: updatedQuestions,
        };
      });
      setIsReadyToChat(true);
    }
  }

  useEffect(() => {
    socket.on('questions', (questions) => {
      setQuestions(questions);
    });

    socket.on('answerProgress', (progress) => {
      if (progress.username !== usernames.username) {
        setFriendProgress(progress.array);
      }
    });

    return () => {
      socket.off('questions');
      socket.off('answerProgress');
    };
  }, []);

  if (questions.length === 0) {
    return <Loading message='Loading questions...' />;
  }

  return (
    <section className='h-[70vh] container'>
      <h1 className='text-center text-2xl font-semibold'>
        Answer these questions before the time runs out
      </h1>
      {isOver ? (
        <p className='text-center text-red-700 font-medium mt-8 text-xl'>Time is out!</p>
      ) : (
        <div className='flex justify-center items-center gap-2 mt-8 bg-primary border-secondary border-2 rounded max-w-fit px-2 py-1 mx-auto'>
          <Timer size={20} />
          <p className='text-xl font-medium'>
            {minutes}:{seconds}
          </p>
        </div>
      )}
      <div className='border-2 mt-12 border-secondary rounded w-[50rem] mx-auto'>
        <h2 className='text-xl font-semibold py-8 text-center'>
          {questions[arrayState.currQuestion].question}
        </h2>
        <div className='flex justify-between'>
          <button
            onClick={() =>
              hUpdateAnswerProgress(
                questions[arrayState.currQuestion].question,
                questions[arrayState.currQuestion].answer1
              )
            }
            className='text-center bg-primary w-full py-6 font-semibold border-t-2 border-secondary rounded-bl-sm hover:bg-secondary hover:text-primary duration-200'
          >
            {questions[arrayState.currQuestion].answer1}
          </button>
          <button
            onClick={() =>
              hUpdateAnswerProgress(
                questions[arrayState.currQuestion].question,
                questions[arrayState.currQuestion].answer2
              )
            }
            className='text-center bg-primary w-full py-6 font-semibold border-t-2 border-l-2 border-secondary rounded-br-sm hover:bg-secondary hover:text-primary duration-200'
          >
            {questions[arrayState.currQuestion].answer2}
          </button>
        </div>
      </div>
      <ProgressIndicator array={arrayState.questions} title={usernames.username} />
      <ProgressIndicator array={friendProgress} title={usernames.friendUsername} />
    </section>
  );
}
