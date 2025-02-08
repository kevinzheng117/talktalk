"use client";  // Ensure this is at the top

// accuracy out of 100
// topics: food, sports, news, travel, music, school, career


// Define categories and initialize data
const categories = [
  "Food",
  "Sports",
  "News",
  "Travel",
  "Music",
  "School",
  "Career",
];

import { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Star, ListChecks, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";


const LanguageProgress = () => {
  const [xp, setXp] = useState(420);
  const [level, setLevel] = useState(3);
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", xp: 1200 },
    { name: "Bob", xp: 950 },
    { name: "You", xp: 870 },
    { name: "Emma", xp: 780 },
  ]);
  const [aiChallenges, setAiChallenges] = useState([
    "Practice 5 new words",
    "Watch a 2-minute video",
    "Complete a listening quiz",
  ]);

  useEffect(() => {
    if (xp >= 500) {
      setLevel(level + 1);
      setXp(0);
    }
  }, [xp]);

  return (
    <div className="p-6 space-y-6">
      {/* XP & Level Progress */}
      <Card className="p-4 shadow-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-500" />
          Level {level} - XP: {xp}/500
        </h2>
        <div className="relative w-full h-3 bg-gray-300 rounded-md overflow-hidden mt-2">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${(xp / 500) * 100}%` }} 
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="h-3 bg-green-500 rounded-md"
          />
        </div>
      </Card>

      {/* Achievements & Badges */}
      <Card className="p-4 shadow-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Award className="w-6 h-6 text-yellow-500" />
          Achievements
        </h2>
        <div className="flex gap-3 mt-2">
          <Badge className="bg-yellow-400 text-black flex items-center gap-1">
            <Star className="w-4 h-4" /> 100 Days Streak
          </Badge>
          <Badge className="bg-blue-400 text-white flex items-center gap-1">
            <ListChecks className="w-4 h-4" /> 50 Quizzes Completed
          </Badge>
          <Badge className="bg-green-400 text-white flex items-center gap-1">
            <BrainCircuit className="w-4 h-4" /> AI Mastery Level 2
          </Badge>
        </div>
      </Card>

      {/* Leaderboard */}
      <Card className="p-4 shadow-lg">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-purple-500" />
          Leaderboard
        </h2>
        <ul className="mt-2 space-y-2">
          {leaderboard.map((user, index) => (
            <li key={index} className={`flex justify-between px-2 py-1 ${user.name === "You" ? "font-bold text-blue-600" : ""}`}>
              {index + 1}. {user.name} <span className="text-gray-500">{user.xp} XP</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Personalized AI Challenges */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
        <Card className="p-4 shadow-lg">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-red-500" />
            AI Challenges
          </h2>
          <ul className="mt-2 space-y-2">
            {aiChallenges.map((challenge, index) => (
              <motion.li 
                key={index} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3, delay: index * 0.1 }} 
                className="px-2 py-1 bg-black rounded-md">
                {challenge}
              </motion.li>
            ))}
          </ul>
        </Card>
      </motion.div>
    </div>
  );
};

export default LanguageProgress;



// const LanguageProgress = () => {
//   // Mastery levels for each category initialized to 0
//   const [masteryLevels, setMasteryLevels] = useState(
//     categories.reduce((acc, category) => {
//       acc[category] = { score: 0, lastReviewed: Date.now() };
//       return acc;
//     }, {} as Record<string, { score: number; lastReviewed: number }>)
//   );

//   // Simple spaced repetition technique: increase mastery every time the user answers correctly
//   const updateMastery = (category: string, accuracy: number) => {
//     // Spaced repetition: increase mastery score based on accuracy and time since last review
//     setMasteryLevels((prev) => {
//       const now = Date.now();
//       const lastReviewed = prev[category].lastReviewed;
//       const timeSinceLastReview = (now - lastReviewed) / (1000 * 60 * 60 * 24); // Time in days

//       let masteryIncrease = accuracy * (1 + timeSinceLastReview * 0.05); // Example of using time-based increase
//       masteryIncrease = Math.min(masteryIncrease, 100); // Cap mastery at 100%

//       return {
//         ...prev,
//         [category]: {
//           score: masteryIncrease,
//           lastReviewed: now, // Update last reviewed time
//         },
//       };
//     });
//   };

//   useEffect(() => {
//     // Simulate category updates based on accuracy score
//     categories.forEach((category) => {
//       // Random accuracy score for demonstration, replace with actual user data
//       const accuracy = Math.random(); // Accuracy between 0 and 1
//       updateMastery(category, accuracy);
//     });
//   }, []);

//   return (
//     <div style={{ width: "80%", margin: "0 auto", textAlign: "center", padding: "20px" }}>
//       <h2>Language Mastery Progress</h2>
//       {categories.map((category) => {
//         const mastery = masteryLevels[category];
//         return (
//           <div key={category} style={{ marginBottom: "20px" }}>
//             <h3>{category}</h3>
//             <p>Mastery: {Math.round(mastery.score)}%</p>

//             <div
//               style={{
//                 backgroundColor: "#e0e0e0",
//                 borderRadius: "10px",
//                 height: "30px",
//                 width: "100%",
//                 marginBottom: "10px",
//               }}
//             >
//               <div
//                 style={{
//                   height: "100%",
//                   borderRadius: "10px",
//                   width: `${mastery.score}%`,
//                   backgroundColor: mastery.score === 100 ? "green" : "blue",
//                   transition: "width 0.3s ease",
//                 }}
//               ></div>
//             </div>
//           </div>
//         );
//       })}

//       <button
//         onClick={() => alert("Spaced repetition completed")}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#4CAF50",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: "pointer",
//         }}
//       >
//         Complete Lesson & Update Mastery
//       </button>
//     </div>
//   );
// };

// export default LanguageProgress;