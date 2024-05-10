import { SmilePlus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { socket } from '../../lib/socket';

type ReactionEmojiProps = {
  id: number;
};

export default function ReactionEmoji({ id }: ReactionEmojiProps) {
  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as HTMLDivElement) &&
        btnRef.current &&
        !btnRef.current.contains(event.target as HTMLDivElement)
      ) {
        setIsReactionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function addReaction(emoji: string) {
    socket.emit('addReaction', { id, emoji });
  }

  const emojiList = ['😀', '😂', '😍', '☹️', '👍', '👎', '😭', '💀', '❤️', '💩', '😳', '😒'];

  return (
    <>
      <button
        ref={btnRef}
        onClick={() => setIsReactionMenuOpen((prevState) => !prevState)}
        className={`btn text-gray-500 absolute top-[50%] -translate-y-1/2 duration-100 opacity-0 group-hover:opacity-100 -right-6`}
      >
        <SmilePlus size={18} />
      </button>
      <div
        ref={menuRef}
        className={`p-1 bg-white border rounded border-secondary border-opacity-25 max-w-[10rem] flex gap-1 flex-wrap absolute top-1/2 -translate-y-1/2 -right-48 
        ${isReactionMenuOpen ? 'block' : 'hidden'}`}
      >
        {emojiList.map((emoji) => {
          return (
            <button
              key={emoji}
              onClick={() => {
                addReaction(emoji);
                setIsReactionMenuOpen(false);
              }}
            >
              {emoji}
            </button>
          );
        })}
      </div>
    </>
  );
}
