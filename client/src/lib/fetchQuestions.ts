type Question = {
  question: string;
  answer1: string;
  answer2: string;
};

export async function fetchQuestions() {
  try {
    const response = await fetch('http://localhost:3500/api/questions');
    if (!response.ok) {
      throw new Error('Failed to fetch questions');
    }
    const data = await response.json();
    console.log(data);

    return data as Question[];
  } catch (error) {
    console.error('Error fetching questions:', error);
  }
}
