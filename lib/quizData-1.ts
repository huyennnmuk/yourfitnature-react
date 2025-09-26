export interface Answer {
  text: string;
  value: string;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
}

export interface Result {
  id: string;
  text: string;
  recommendations: string[];
}

export interface QuizData {
  questions: Question[];
  results: Result[];
}

export const quizData: QuizData = {
  questions: [
    {
      id: 1,
      text: 'How often do you experience bloating?',
      answers: [
        { text: 'Rarely or never', value: 'a' },
        { text: 'A few times a month', value: 'b' },
        { text: 'A few times a week', value: 'c' },
        { text: 'Almost every day', value: 'd' },
      ],
    },
    {
      id: 2,
      text: 'When is your bloating most noticeable?',
      answers: [
        { text: 'After meals', value: 'a' },
        { text: 'In the morning', value: 'b' },
        { text: 'In the evening', value: 'c' },
        { text: 'It\'s constant throughout the day', value: 'd' },
      ],
    },
    {
      id: 3,
      text: 'Which of these foods do you eat regularly?',
      answers: [
        { text: 'Dairy products (milk, cheese, yogurt)', value: 'a' },
        { text: 'Wheat-based products (bread, pasta)', value: 'b' },
        { text: 'Legumes (beans, lentils)', value: 'c' },
        { text: 'None of the above', value: 'd' },
      ],
    },
     {
      id: 4,
      text: 'How would you describe your stress levels?',
      answers: [
        { text: 'Low stress', value: 'a' },
        { text: 'Moderate stress', value: 'b' },
        { text: 'High stress', value: 'c' },
      ],
    },
  ],
  results: [
    {
      id: 'food-sensitivity',
      text: 'It seems like your bloating might be related to food sensitivities.',
      recommendations: [
        'Consider a digestive enzyme supplement to help break down food.',
        'Try an elimination diet to identify specific trigger foods.',
        'Our recommended probiotic can help improve your gut microbiome.',
      ],
    },
    {
      id: 'general-discomfort',
      text: 'Your bloating seems to be occasional and might be related to general digestive discomfort.',
      recommendations: [
        'A daily probiotic can support overall gut health.',
        'Peppermint tea can help soothe an upset stomach.',
        'Ensure you are drinking enough water throughout the day.',
      ],
    },
     {
      id: 'stress-related',
      text: 'Your bloating could be linked to stress, which can significantly impact digestion.',
      recommendations: [
        'Incorporate stress-reducing activities like yoga or meditation.',
        'Consider adaptogenic herbs like Ashwagandha.',
        'A calming magnesium supplement before bed may help.',
      ],
    },
  ],
};