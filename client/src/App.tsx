import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import MainMenu from './components/MainMenu';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import { socket } from './lib/socket';
import Questions from './components/Questions';
import { Tusernames } from './types/user';
import { TarrayState, Tprogress, Tquestions } from './types/questions';

function App() {
  const [isPaired, setIsPaired] = useState(false);
  const [isReadyToChat, setIsReadyToChat] = useState(false);
  const [usernames, setUsernames] = useState<Tusernames>({ username: '', friendUsername: '' });
  const [questions, setQuestions] = useState<Tquestions>([]);
  const [isFriendReady, setIsFriendReady] = useState(false);
  const [friendProgress, setFriendProgress] = useState<Tprogress>(
    Array.from({ length: 10 }, () => ({ question: '', answer: '' }))
  );
  const [arrayState, setArrayState] = useState<TarrayState>({
    currQuestion: 0,
    questions: Array.from({ length: 10 }, () => ({ question: '', answer: '' })),
  });
  const userId = socket.id;

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <main className='flex flex-col justify-between h-[100vh]'>
      <Navbar />
      {isPaired ? (
        isReadyToChat ? (
          <Chat
            usernames={usernames}
            socket={socket}
            answers={arrayState.questions}
            friendAnswers={friendProgress}
            setFriendProgress={setFriendProgress}
            questions={questions}
            userId={userId}
            isFriendReady={isFriendReady}
            setIsFriendReady={setIsFriendReady}
          />
        ) : (
          <Questions
            usernames={usernames}
            setIsReadyToChat={setIsReadyToChat}
            socket={socket}
            arrayState={arrayState}
            setArrayState={setArrayState}
            friendProgress={friendProgress}
            setFriendProgress={setFriendProgress}
            questions={questions}
            setQuestions={setQuestions}
            setIsFriendReady={setIsFriendReady}
          />
        )
      ) : (
        <MainMenu
          socket={socket}
          setIsPaired={setIsPaired}
          usernames={usernames}
          setUsernames={setUsernames}
        />
      )}
      <Footer />
    </main>
  );
}

export default App;
