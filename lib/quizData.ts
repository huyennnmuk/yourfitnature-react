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
      text: "How often do you experience bloating?",
      answers: [
        {
          text: "Rarely or never",
          value: "a"
        },
        {
          text: "A few times a month",
          value: "b"
        },
        {
          text: "A few times a week",
          value: "c"
        },
        {
          text: "Almost every day",
          value: "d"
        }
      ]
    },
    {
      id: 2,
      text: "At what time of day is your bloating most noticeable?",
      answers: [
        {
          text: "After meals",
          value: "a"
        },
        {
          text: "In the morning",
          value: "b"
        },
        {
          text: "In the evening",
          value: "c"
        },
        {
          text: "It’s constant throughout the day",
          value: "d"
        }
      ]
    },
    {
      id: 3,
      text: "Which of these foods or ingredients do you regularly consume? (select all that apply)",
      answers: [
        {
          text: "Dairy products (milk, cheese, yogurt)",
          value: "a"
        },
        {
          text: "Wheat/gluten (bread, pasta, pastries)",
          value: "b"
        },
        {
          text: "Legumes (beans, lentils, chickpeas)",
          value: "c"
        },
        {
          text: "Garlic/onions",
          value: "d"
        },
        {
          text: "None of the above",
          value: "e"
        }
      ]
    },
    {
      id: 4,
      text: "How many carbonated drinks (soda, sparkling water) do you consume per day?",
      answers: [
        {
          text: "0",
          value: "a"
        },
        {
          text: "1",
          value: "b"
        },
        {
          text: "2",
          value: "c"
        },
        {
          text: "3 or more",
          value: "d"
        }
      ]
    },
    {
      id: 5,
      text: "Do you notice bloating after eating large or fast meals?",
      answers: [
        {
          text: "Yes, often",
          value: "a"
        },
        {
          text: "Sometimes",
          value: "b"
        },
        {
          text: "Rarely",
          value: "c"
        },
        {
          text: "No",
          value: "d"
        }
      ]
    },
    {
      id: 6,
      text: "How often do you chew gum or drink through a straw?",
      answers: [
        {
          text: "Never",
          value: "a"
        },
        {
          text: "Occasionally (1–2 times/week)",
          value: "b"
        },
        {
          text: "Several times/week",
          value: "c"
        },
        {
          text: "Daily",
          value: "d"
        }
      ]
    },
    {
      id: 7,
      text: "How many bowel movements do you typically have per week?",
      answers: [
        {
          text: "Less than 3",
          value: "a"
        },
        {
          text: "3–7",
          value: "b"
        },
        {
          text: "More than 7",
          value: "c"
        },
        {
          text: "Not sure",
          value: "d"
        }
      ]
    },
    {
      id: 8,
      text: "When you’re bloated, do you also feel constipated?",
      answers: [
        {
          text: "Yes",
          value: "a"
        },
        {
          text: "Sometimes",
          value: "b"
        },
        {
          text: "No",
          value: "c"
        }
      ]
    },
    {
      id: 9,
      text: "Do you experience bloating around or before your menstrual period?",
      answers: [
        {
          text: "Yes",
          value: "a"
        },
        {
          text: "No",
          value: "b"
        },
        {
          text: "Not applicable",
          value: "c"
        }
      ]
    },
    {
      id: 10,
      text: "How would you describe your stress levels over the past two weeks?",
      answers: [
        {
          text: "Low",
          value: "a"
        },
        {
          text: "Moderate",
          value: "b"
        },
        {
          text: "High",
          value: "c"
        }
      ]
    },
    {
      id: 11,
      text: "On average, how many hours of sleep do you get per night?",
      answers: [
        {
          text: "Less than 5",
          value: "a"
        },
        {
          text: "5–7",
          value: "b"
        },
        {
          text: "7–9",
          value: "c"
        },
        {
          text: "More than 9",
          value: "d"
        }
      ]
    },
    {
      id: 12,
      text: "Do gas-producing foods (broccoli, cabbage, brussels sprouts) cause noticeable bloating?",
      answers: [
        {
          text: "Yes",
          value: "a"
        },
        {
          text: "Sometimes",
          "value": "b"
        },
        {
          text: "Rarely",
          value: "c"
        },
        {
          text: "I don’t eat these foods",
          value: "d"
        }
      ]
    },
    {
      id: 13,
      text: "How often do you consume dairy products?",
      answers: [
        {
          text: "Daily",
          value: "a"
        },
        {
          text: "Several times/week",
          value: "b"
        },
        {
          text: "Occasionally",
          value: "c"
        },
        {
          text: "Never",
          value: "d"
        }
      ]
    },
    {
      id: 14,
      text: "How often do you use artificial sweeteners or sugar alcohols (e.g., xylitol, sorbitol)?",
      answers: [
        {
          text: "Daily",
          value: "a"
        },
        {
          text: "Several times/week",
          value: "b"
        },
        {
          text: "Rarely",
          value: "c"
        },
        {
          text: "Never",
          value: "d"
        }
      ]
    },
    {
      id: 15,
      text: "Have you taken antibiotics in the past year?",
      answers: [
        {
          text: "Within the last month",
          value: "a"
        },
        {
          text: "In the last 3 months",
          value: "b"
        },
        {
          text: "In the last year",
          value: "c"
        },
        {
          text: "No antibiotics in the past year",
          value: "d"
        }
      ]
    },
    {
      id: 16,
      text: "Do you have any diagnosed gastrointestinal conditions?",
      answers: [
        {
          text: "Irritable Bowel Syndrome (IBS)",
          value: "a"
        },
        {
          text: "Celiac disease",
          value: "b"
        },
        {
          text: "None",
          value: "c"
        },
        {
          text: "Not sure",
          value: "d"
        }
      ]
    },
    {
      id: 17,
      text: "Do you experience abdominal pain in addition to bloating?",
      answers: [
        {
          text: "Yes",
          value: "a"
        },
        {
          text: "Sometimes",
          value: "b"
        },
        {
          text: "No",
          value: "c"
        }
      ]
    },
    {
      id: 18,
      text: "Does physical activity (e.g., walking, yoga) help relieve your bloating?",
      answers: [
        {
          text: "Yes, it helps",
          value: "a"
        },
        {
          text: "Sometimes",
          value: "b"
        },
        {
          text: "No",
          value: "c"
        },
        {
          text: "I don’t exercise",
          value: "d"
        }
      ]
    },
    {
      id: 19,
      text: "Do high-fiber foods or supplements (like bran or psyllium) cause bloating?",
      answers: [
        {
          text: "Yes",
          value: "a"
        },
        {
          text: "Sometimes",
          value: "b"
        },
        {
          text: "No",
          value: "c"
        },
        {
          text: "I don’t eat high-fiber foods",
          value: "d"
        }
      ]
    },
    {
      id: 20,
      text: "Which supplements do you currently take regularly? (select all that apply)",
      answers: [
        {
          text: "Probiotic",
          value: "a"
        },
        {
          text: "Digestive enzyme",
          value: "b"
        },
        {
          text: "Peppermint oil",
          value: "c"
        },
        {
          text: "None",
          value: "d"
        }
      ]
    }
  ],
  results: [
    {
      id: "fodmap-sensitivity",
      text: "Your responses suggest that high-FODMAP foods (onion, garlic, beans, wheat) may be a significant trigger for your bloating.",
      recommendations: [
        "Try a low-FODMAP diet for 2 weeks to identify triggers.",
        "Slowly reintroduce foods to pinpoint specific culprits.",
        "Consider a digestive enzyme that targets FODMAPs, such as alpha-galactosidase.",
        "Explore our low-FODMAP meal planning resources for recipe inspiration."
      ]
    },
    {
      id: "lactose-intolerance",
      text: "Your answers indicate that dairy/lactose intolerance might be contributing to your bloating.",
      recommendations: [
        "Reduce or eliminate dairy products for a week to see if symptoms improve.",
        "Use lactose-free alternatives or lactase enzyme supplements when consuming dairy.",
        "Include probiotic-rich foods (e.g., kefir, sauerkraut) to support digestion.",
        "Check out our guide to dairy-free cooking for more ideas."
      ]
    },
    {
      id: "hormonal-bloat",
      text: "Your responses suggest your bloating may be related to hormonal fluctuations (e.g., menstrual cycle).",
      recommendations: [
        "Track your cycle and note when bloating occurs to identify patterns.",
        "Support hormone balance through stress management, adequate sleep, and balanced nutrition.",
        "Consider magnesium or calcium supplements to ease cyclical symptoms.",
        "Read our article on hormone-related bloating for more tips."
      ]
    },
    {
      id: "stress-linked",
      text: "High stress levels could be playing a role in your bloating symptoms.",
      recommendations: [
        "Practice relaxation techniques like deep breathing, meditation, or yoga daily.",
        "Engage in regular physical activity to help manage stress and support digestion.",
        "Consider adaptogenic herbs (e.g., Ashwagandha) under professional guidance.",
        "Explore our stress-relief resources for more strategies."
      ]
    },
    {
      id: "constipation-related",
      text: "Your answers point to possible constipation-related bloating.",
      recommendations: [
        "Increase hydration and fiber intake gradually (e.g., fruit, vegetables, oats).",
        "Incorporate gentle movement such as walking after meals to stimulate gut motility.",
        "Use psyllium husk or magnesium supplements to ease bowel movements if needed.",
        "Check our constipation relief guide for additional support."
      ]
    },
    {
      id: "air-swallowing-carbonation",
      text: "Air swallowing from gum, straws, or carbonated drinks may be causing excess gas and bloating.",
      recommendations: [
        "Reduce or avoid chewing gum and drinking through straws.",
        "Limit carbonated drinks and opt for still water or herbal teas instead.",
        "Eat slowly and chew thoroughly to minimize swallowed air.",
        "Read our tips on reducing swallowed air for more guidance."
      ]
    },
    {
      id: "general-digestive-discomfort",
      text: "Your symptoms appear to be moderate and may be due to general digestive discomfort rather than a single trigger.",
      recommendations: [
        "Adopt mindful eating habits: chew slowly and eat in a relaxed environment.",
        "Incorporate moderate physical activity into your daily routine.",
        "Try probiotic or digestive enzyme supplements to support digestion.",
        "Explore our digestion-friendly recipes and lifestyle tips."
      ]
    },
    {
      id: "gut-dysbiosis",
      text: "Recent antibiotic use or frequent artificial sweeteners may be disrupting your gut microbiome, leading to bloating.",
      recommendations: [
        "Take a high-quality multi-strain probiotic to replenish healthy bacteria.",
        "Limit sugar alcohols and artificial sweeteners that can ferment in the gut.",
        "Consume prebiotic fibers (e.g., artichoke, asparagus) to feed beneficial bacteria.",
        "Check out our gut microbiome restoration plan for guidance."
      ]
    }
  ]
}
