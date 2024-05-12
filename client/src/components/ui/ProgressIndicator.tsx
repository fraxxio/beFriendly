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
    <div className='max-[550px]:flex flex-col items-center'>
      <p className='text-center font-medium text-lg mt-20 max-[550px]:mt-8 max-[550px]:truncate max-[550px]:max-w-[30vw] pb-2'>
        {title}
      </p>
      <div className='max-[550px]:flex flex-col max-[550px]:w-[5rem]'>
        <div className='flex justify-between w-[60%] max-[830px]:w-[100%] mx-auto max-[550px]:flex-col'>
          {array.map((question, index) => {
            return question.answer ? (
              <div
                key={index}
                className='bg-green-700 flex items-center w-full justify-center py-2 border-t border-l min-[550px]:border-b last:border-r border-secondary first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br max-[550px]:border-r max-[550px]:last:border-b max-[550px]:first:rounded-tr max-[550px]:last:rounded-bl max-[550px]:first:rounded-bl-none '
              >
                {index + 1} <Check size={18} />
              </div>
            ) : (
              <div
                key={index}
                className='bg-white flex items-center w-full justify-center py-2 border-t border-l min-[550px]:border-b last:border-r border-secondary first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br max-[550px]:border-b-none max-[550px]:border-r max-[550px]:last:border-b max-[550px]:first:rounded-tr max-[550px]:last:rounded-bl max-[550px]:first:rounded-bl-none'
              >
                {index + 1} <X size={18} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
