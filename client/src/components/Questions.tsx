import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Socket } from 'socket.io-client';
import { fetchQuestions } from '../lib/fetchQuestions';
import Loading from './ui/Loading';
import Error from './ui/Error';

type QuestionsProps = {
  setIsReadyToChat: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
};

// TODO fix API returning same questions

export default function Questions({ setIsReadyToChat, socket }: QuestionsProps) {
  const [arrayState, setArrayState] = useState({
    currQuestion: 0,
    questions: [{}],
  });
  const queryClient = useQueryClient();

  function hUpdateAnswerProgress(question: string, answer: string) {
    if (arrayState.currQuestion < 9) {
      setArrayState((prevState) => ({
        currQuestion: prevState.currQuestion + 1,
        questions: [...prevState.questions, { question: question, answer: answer }],
      }));
    } else {
      setIsReadyToChat(true);
    }
  }

  const { status, data, error } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
  });

  if (status === 'pending') {
    return <Loading />;
  }

  if (status === 'error') {
    return <Error error={error} />;
  }
  console.log(data);

  return (
    <section className='h-[70vh] container'>
      <h1 className='text-center text-2xl font-semibold'>
        Answer these questions before the time runs out
      </h1>
      <div className='border-2 mt-12 border-secondary rounded w-[50rem] mx-auto'>
        <h2 className='text-xl font-semibold py-8 text-center'>
          {data![arrayState.currQuestion].question}
        </h2>
        <div className='flex justify-between'>
          <button
            onClick={() =>
              hUpdateAnswerProgress(
                data![arrayState.currQuestion].question,
                data![arrayState.currQuestion].answer1
              )
            }
            className='text-center bg-primary w-full py-6 font-semibold border-t-2 border-secondary rounded-bl-sm hover:bg-secondary hover:text-primary duration-200'
          >
            {data![arrayState.currQuestion].answer1}
          </button>
          <button
            onClick={() =>
              hUpdateAnswerProgress(
                data![arrayState.currQuestion].question,
                data![arrayState.currQuestion].answer2
              )
            }
            className='text-center bg-primary w-full py-6 font-semibold border-t-2 border-l-2 border-secondary rounded-br-sm hover:bg-secondary hover:text-primary duration-200'
          >
            {data![arrayState.currQuestion].answer2}
          </button>
        </div>
      </div>
    </section>
  );
}
