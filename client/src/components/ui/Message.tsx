type MessageProps = {
  time: string;
  name: string;
  text: string;
  isRightSide: boolean;
  isRepeating: boolean;
};

export default function Message({ text, time, name, isRightSide, isRepeating }: MessageProps) {
  if (name === 'Admin') {
    return (
      <div className='max-w-[40rem] first:mt-0 mt-6 flex gap-2 items-center'>
        <p className='text-sm'>{time}: </p>
        <p>{text}</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-[20rem] first:mt-0 ${isRightSide && 'ml-auto'} ${
        isRepeating
          ? 'border-b-2 border-l-2 border-r-2 -mt-0.5 border-secondary rounded-br rounded-bl'
          : 'mt-6 border-2 border-secondary rounded'
      }`}
    >
      {!isRepeating && (
        <div className='flex justify-between items-center bg-primary border-b-2 border-secondary p-1'>
          <p>{name}</p>
          <p className='text-xs'>{time}</p>
        </div>
      )}
      <p className='px-1 py-2'>{text}</p>
    </div>
  );
}
