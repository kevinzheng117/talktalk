export const languagesToLearn = [
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Mandarin Chinese", value: "zh" },
] as const;

export const proficiencyLevels = [
  { label: "Beginner (A1)", value: "a1" },
  { label: "Elementary (A2)", value: "a2" },
  { label: "Intermediate (B1)", value: "b1" },
  { label: "Upper Intermediate (B2)", value: "b2" },
  { label: "Advanced (C1)", value: "c1" },
  { label: "Mastery (C2)", value: "c2" },
] as const;

export const contentCategories = [
  { label: "Travel & Culture", value: "travel" },
  { label: "Food & Cooking", value: "food" },
  { label: "Sports & Fitness", value: "sports" },
  { label: "Music & Arts", value: "arts" },
  { label: "Business & Professional", value: "business" },
  { label: "Daily Life & Conversation", value: "daily" },
  { label: "News & Current Events", value: "news" },
  { label: "Education & Classroom", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Technology", value: "tech" },
] as const;

export const MOCK_VIDEOS = [
  {
    id: "1",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "Amazing views! #views",
    likes: 1234,
    username: "@viewer",
  },
  {
    id: "2",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    caption: "Dance moves 🕺 #dance",
    likes: 5678,
    username: "@dancer",
  },
  {
    id: "3",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    caption: "Fun times! 🎉 #fun",
    likes: 9012,
    username: "@funtime",
  },
];
