import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type QuestionsProps = {
  setIsReadyToChat: React.Dispatch<React.SetStateAction<boolean>>;
  socket: Socket;
};

type Tquestions = {
  question: string;
  answer1: string;
  answer2: string;
}[];

export default function Questions({ setIsReadyToChat, socket }: QuestionsProps) {
  const [arrayState, setArrayState] = useState({
    currQuestion: 0,
    questions: [{}],
  });
  const [questions, setQuestions] = useState<Tquestions>([]);

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

  useEffect(() => {
    socket.on('questions', (questions) => {
      setQuestions(questions);
    });

    return () => {
      socket.off('questions');
    };
  }, []);

  console.log(questions);

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
    </section>
  );
}
