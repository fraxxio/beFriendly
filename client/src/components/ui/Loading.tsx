import { LoaderCircle } from 'lucide-react';

type LoadingProps = {
  message: string;
};

export default function Loading({ message }: LoadingProps) {
  return (
    <div className='w-full flex justify-center gap-2 text-xl font-semibold items-center'>
      <LoaderCircle className='animate-spin' /> {message}
    </div>
  );
}
