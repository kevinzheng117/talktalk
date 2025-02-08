import { Video, Users, Globe, Trophy } from "lucide-react";

const features = [
  {
    name: "Short-Form Learning",
    description:
      "Learn through bite-sized video lessons created by native speakers and language experts.",
    icon: Video,
  },
  {
    name: "Global Community",
    description:
      "Connect with language learners and native speakers from over 190 countries.",
    icon: Users,
  },
  {
    name: "Multiple Languages",
    description:
      "Access courses in 50+ languages with personalized learning paths.",
    icon: Globe,
  },
  {
    name: "Gamified Progress",
    description:
      "Stay motivated with achievements, streaks, and learning challenges.",
    icon: Trophy,
  },
];

export default function Features() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-300 mb-6">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.name} className="flex items-center space-x-4">
              <feature.icon className="h-6 w-6 text-blue-500" />
              <div>
                <h3 className="text-lg font-medium text-gray-400">
                  {feature.name}
                </h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
