import { Smile } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type EmojiMenuProps = {
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
};

export default function EmojiMenu({ setUserInput }: EmojiMenuProps) {
  const [isEmojiMenuOpen, setIsEmojiMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const emojiList = [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '🥲',
    '🥹',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😝',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🥸',
    '🤩',
    '🥳',
    '🙂‍↕️',
    '😏',
    '😒',
    '🙂‍↔️',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😮‍💨',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🫣',
    '🤗',
    '🫡',
    '🤔',
    '🫢',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😶‍🌫️',
    '😐',
    '😑',
    '😬',
    '🫨',
    '🫠',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '😵‍💫',
    '🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    '😈',
    '👿',
    '💩',
    '👻',
    '💀',
    '👽',
    '👋',
    '🤚',
    '🖐',
    '✋',
    '🖖',
    '👌',
    '🤌',
    '🤏',
    '✌️',
    '🤞',
    '🫰',
    '🤟',
    '🤘',
    '🤙',
    '🫵',
    '🫱',
    '🫲',
    '🫸',
    '🫷',
    '🫳',
    '🫴',
    '👈',
    '👉',
    '👆',
    '🖕',
    '👇',
    '☝️',
    '👍',
    '👎',
    '✊',
    '👊',
    '🤛',
    '🤜',
    '👏',
    '🫶',
    '🙌',
    '👐',
    '🤲',
    '🤝',
    '🙏',
    '✍️',
    '💅',
    '🤳',
    '💪',
    '🦾',
    '🦵',
    '🦿',
    '🦶',
    '👣',
    '👂',
    '🦻',
    '👃',
    '🫀',
    '🫁',
    '🧠',
    '🦴',
    '👀',
    '👁',
    '👅',
    '👄',
    '🫦',
    '💋',
    '👶',
    '👧',
    '🧒',
    '👦',
    '👩',
    '🧑',
    '👨',
    '👩‍🦱',
    '🧑‍🦱',
    '👨‍🦱',
    '👩‍🦰',
    '🧑‍🦰',
    '👨‍🦰',
    '👱‍♀️',
    '👱',
    '👱‍♂️',
    '👩‍🦳',
    '🧑‍🦳',
    '👨‍🦳',
    '👩‍🦲',
    '🧑‍🦲',
    '👨‍🦲',
    '🧔‍♀️',
    '🧔',
    '🧔‍♂️',
    '👵',
    '🧓',
    '👴',
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLDivElement) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsEmojiMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        className={`border-t-2 p-1 overflow-auto border-secondary bg-white h-[7rem] absolute flex flex-wrap gap-1 -top-[267%] w-[100%] 
      ${isEmojiMenuOpen ? 'block' : 'hidden'}`}
        ref={menuRef}
      >
        {emojiList.map((emoji) => {
          return (
            <button
              key={emoji}
              type='button'
              className='text-xl'
              onClick={() =>
                setUserInput((prevInput) => {
                  return prevInput + ' ' + emoji;
                })
              }
            >
              {emoji}
            </button>
          );
        })}
      </div>
      <button
        ref={btnRef}
        onClick={() => setIsEmojiMenuOpen((prevState) => !prevState)}
        className='z-10 absolute right-16 top-1/2 -translate-y-1/2 bg-white h-[65%] px-2 group'
        type='button'
      >
        <Smile className='group-hover:rotate-180 duration-200' />
      </button>
    </>
  );
}
