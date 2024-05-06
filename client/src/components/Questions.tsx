import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import Loading from './ui/Loading';
import ProgressIndicator from './ui/ProgressIndicator';

type QuestionsProps = {
  setIsReadyToChat: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
  username: string;
};

type Tquestions = {
  question: string;
  answer1: string;
  answer2: string;
}[];

type Tprogress = {
  question: string;
  answer: string;
}[];

export default function Questions({ setIsReadyToChat, socket, username }: QuestionsProps) {
  const [arrayState, setArrayState] = useState({
    currQuestion: 0,
    questions: Array.from({ length: 10 }, () => ({ question: '', answer: '' })),
  });
  const [questions, setQuestions] = useState<Tquestions>([]);
  const [friendProgress, setFriendProgress] = useState<Tprogress>(
    Array.from({ length: 10 }, () => ({ question: '', answer: '' }))
  );

  function hUpdateAnswerProgress(question: string, answer: string) {
    const updatedQuestions = arrayState.questions.map((item, index) =>
      index === arrayState.currQuestion ? { question: question, answer: answer } : item
    );
    if (arrayState.currQuestion < 9) {
      setArrayState((prevState) => {
        socket.emit('answerProgress', { array: updatedQuestions, username: username });

        return {
          currQuestion: prevState.currQuestion + 1,
          questions: updatedQuestions,
        };
      });
    } else {
      socket.emit('answerProgress', { array: updatedQuestions, username: username });
      setIsReadyToChat(true);
    }
  }

  useEffect(() => {
    socket.on('questions', (questions) => {
      setQuestions(questions);
    });

    socket.on('answerProgress', (progress) => {
      if (progress.username !== username) {
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
      <ProgressIndicator array={arrayState.questions} title='You' />
      <ProgressIndicator array={friendProgress} title='Friend' />
    </section>
  );
}
