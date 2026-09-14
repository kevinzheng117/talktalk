import { QuizQuestion } from "@/types/quiz-data";
import type { LearningVideo } from "@/types/video";

export const languagesToLearn = [
  { label: "Spanish", value: "es" },
  { label: "English", value: "eg" },
  // { label: "French", value: "fr" },
  // { label: "German", value: "de" },
  // { label: "Italian", value: "it" },
  // { label: "Japanese", value: "ja" },
  // { label: "Korean", value: "ko" },
  // { label: "Mandarin Chinese", value: "zh" },
] as const;

export const proficiencyLevels = [
  { label: "Beginner", value: "1" },
  { label: "Intermediate", value: "2" },
  { label: "Advanced", value: "3" },
] as const;

export const contentCategories = [
  { label: "Travel", value: "travel" },
  { label: "Food", value: "food" },
  { label: "Sports", value: "sports" },
  { label: "Music", value: "music" },
  { label: "News", value: "news" },
  { label: "Career", value: "career" },
  { label: "Education", value: "education" },
  { label: "Lifestyle", value: "lifestyle" },
  { label: "Fashion", value: "fashion" },
] as const;

export const MOCK_VIDEOS: LearningVideo[] = [
  {
    id: "1",
    name: "sintel-trailer.mp4",
    url: "/demo-videos/sintel-trailer.mp4",
    mediaType: "video",
    title: "Adventure vocabulary",
    caption:
      "Una aventura inolvidable — an unforgettable adventure. Listen, then repeat.",
    likes: 1234,
    username: "@talktalk_travel",
  },
  {
    id: "2",
    name: "flower.mp4",
    url: "/demo-videos/flower.mp4",
    mediaType: "video",
    title: "Making plans",
    caption:
      "¿Qué te gustaría hacer hoy? — What would you like to do today?",
    likes: 5678,
    username: "@talktalk_spanish",
  },
  {
    id: "3",
    name: "big-buck-bunny.mp4",
    url: "/demo-videos/big-buck-bunny.mp4",
    mediaType: "video",
    title: "Giving directions",
    caption: "Sigue todo recto — continue straight ahead. Try saying it aloud.",
    likes: 9012,
    username: "@talktalk_spanish",
  },
];

export const demoQuizData: QuizQuestion[][] = [
  [
    {
      question: "What does “una aventura inolvidable” mean?",
      answers: [
        "An unforgettable adventure",
        "A quiet afternoon",
        "A difficult question",
        "An early flight",
      ],
      correct_answer: "An unforgettable adventure",
    },
    {
      question: "Which phrase asks what someone would like to do?",
      answers: [
        "¿Qué te gustaría hacer?",
        "¿Dónde está el hotel?",
        "¿Cuánto cuesta?",
        "¿Qué hora es?",
      ],
      correct_answer: "¿Qué te gustaría hacer?",
    },
    {
      question: "What does “hoy” mean in English?",
      answers: ["Today", "Tomorrow", "Yesterday", "Always"],
      correct_answer: "Today",
    },
  ],
  [
    {
      question: "What does “sigue todo recto” tell you to do?",
      answers: ["Continue straight", "Turn left", "Stop here", "Go upstairs"],
      correct_answer: "Continue straight",
    },
    {
      question: "What should you compare in the word-choice lesson?",
      answers: [
        "Sentence structure",
        "Video colors",
        "Speaker clothing",
        "Background music",
      ],
      correct_answer: "Sentence structure",
    },
    {
      question: "Which habit best supports pronunciation practice?",
      answers: [
        "Listening and repeating",
        "Skipping every word",
        "Reading silently only",
        "Avoiding feedback",
      ],
      correct_answer: "Listening and repeating",
    },
  ],
];

export const quizData: QuizQuestion[][] = [
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "What Barcelona park does the speaker love?",
      answers: [
        "Ciutadella Park",
        "Parque Güell",
        "Montjuïc Park",
        "Labyrinth Park",
      ],
      correct_answer: "Parque Güell",
    },
    {
      question: "What is Parque Güell known for having?",
      answers: ["Beaches", "Colorful sculptures", "Zoos", "Amusement rides"],
      correct_answer: "Colorful sculptures",
    },
    {
      question: "What activity does the speaker enjoy at the park?",
      answers: [
        "Swimming",
        "Walking the trails",
        "Playing sports",
        "Having picnics",
      ],
      correct_answer: "Walking the trails",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "What should you see in Costa Rica?",
      answers: ["Big cities", "The rainforest", "Snowy mountains", "Deserts"],
      correct_answer: "The rainforest",
    },
    {
      question: "Which animals can you find in Costa Rica's rainforest?",
      answers: [
        "Penguins and seals",
        "Monkeys and toucans",
        "Lions and tigers",
        "Polar bears and walruses",
      ],
      correct_answer: "Monkeys and toucans",
    },
    {
      question: "What are the Pacific coast beaches good for?",
      answers: [
        "Skiing",
        "Surfing and relaxing",
        "Ice skating",
        "Mountain climbing",
      ],
      correct_answer: "Surfing and relaxing",
    },
  ],
  [
    {
      question: "What should you see in Costa Rica?",
      answers: ["Big cities", "The rainforest", "Snowy mountains", "Deserts"],
      correct_answer: "The rainforest",
    },
    {
      question: "Which animals can you find in Costa Rica's rainforest?",
      answers: [
        "Penguins and seals",
        "Monkeys and toucans",
        "Lions and tigers",
        "Polar bears and walruses",
      ],
      correct_answer: "Monkeys and toucans",
    },
    {
      question: "What are the Pacific coast beaches good for?",
      answers: [
        "Skiing",
        "Surfing and relaxing",
        "Ice skating",
        "Mountain climbing",
      ],
      correct_answer: "Surfing and relaxing",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where was the speaker sleeping recently?",
      answers: ["In a hotel", "Under a bridge", "At home", "On the beach"],
      correct_answer: "Under a bridge",
    },
    {
      question: "What is the speaker drinking now?",
      answers: ["Water", "Juice", "Champagne", "Soda"],
      correct_answer: "Champagne",
    },
    {
      question: "Where is the speaker currently located?",
      answers: [
        "Under a bridge",
        "In a small boat",
        "On the world's largest ship",
        "At a party",
      ],
      correct_answer: "On the world's largest ship",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
  [
    {
      question: "Where is this plan located near?",
      answers: ["Valencia", "Caracas", "Maracaibo", "Mérida"],
      correct_answer: "Caracas",
    },
    {
      question: "What is Arte Murano in Potrerito?",
      answers: ["A museum", "A glass factory", "A restaurant", "A park"],
      correct_answer: "A glass factory",
    },
    {
      question: "What raw material is transformed into glass?",
      answers: ["Clay", "Metal", "Sand", "Plastic"],
      correct_answer: "Sand",
    },
  ],
];
