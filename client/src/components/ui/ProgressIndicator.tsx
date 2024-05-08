import { Check, X } from 'lucide-react';
type ProgressIndicatorProps = {
  array: {
    question: string;
    answer: string;
  }[];
  title: string;
};

export default function ProgressIndicator({ array, title }: ProgressIndicatorProps) {
  return (
    <>
      <p className='text-center font-medium text-lg mt-20'>{title}</p>
      <div className='flex justify-between w-[50rem] mx-auto'>
        {array.map((question, index) => {
          return question.answer ? (
            <div
              key={index}
              className='bg-green-700 flex items-center w-full justify-center py-2 border-t border-l border-b last:border-r border-secondary first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br'
            >
              {index + 1} <Check size={18} />
            </div>
          ) : (
            <div
              key={index}
              className='bg-white flex items-center w-full justify-center py-2 border-t border-l border-b last:border-r border-secondary first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br'
            >
              {index + 1} <X size={18} />
            </div>
          );
        })}
      </div>
    </>
  );
}
