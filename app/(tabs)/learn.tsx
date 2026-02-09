import { Activity, ChevronDown, ChevronUp, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const modules = [
  {
    id: "cpr",
    title: "CPR (Cardiopulmonary Resuscitation)",
    icon: <Heart size={24} color="#ef4444" />,
    description: "Life-saving technique for cardiac arrest.",
    steps: [
      "Check for responsiveness. Shake the person gently and shout.",
      "Call for emergency help (108/102 in India) immediately.",
      "Check for breathing. If not breathing, start chest compressions.",
      "Push hard and fast in the center of the chest (100-120 compressions/minute).",
      "Continue compressions until help arrives.",
    ],
  },
  {
    id: "bleeding",
    title: "Severe Bleeding",
    icon: <Activity size={24} color="#ef4444" />,
    description: "How to stop heavy bleeding.",
    steps: [
      "Apply direct pressure on the wound with a clean cloth.",
      "Maintain pressure for at least 10-15 minutes.",
      "If blood soaks through, add more cloth without removing the first one.",
      "Raise the injured part above the heart level if possible.",
      "Keep the person warm and calm.",
    ],
  },
  {
    id: "snakebite",
    title: "Snake Bite",
    icon: <Activity size={24} color="#f59e0b" />,
    description: "Immediate actions for snake bites.",
    steps: [
      "Keep the person calm and still to slow the spread of venom.",
      "Remove jewelry or tight clothing near the bite.",
      "Position the bite below heart level.",
      "Clean the wound with soap and water.",
      "Do NOT cut the wound or suck out the venom. Transport to hospital immediately.",
    ],
  },
];

const dietModules = [
  {
    id: "anemia_diet",
    title: "Diet for Anemia",
    icon: <Activity size={24} color="#10b981" />,
    description: "Iron-rich foods to boost hemoglobin.",
    steps: [
      "Eat Green Leafy Vegetables: Spinach, Fenugreek (Methi).",
      "Consume Jaggery (Gud) and Peanuts daily.",
      "Include Pulses and Lentils (Dal) in every meal.",
      "Vitamin C (Lemon, Amla) helps absorb Iron.",
      "Avoid tea/coffee immediately after meals.",
    ],
  },
  {
    id: "hydration",
    title: "Hydration Tips",
    icon: <Activity size={24} color="#3b82f6" />,
    description: "Staying hydrated in hot weather.",
    steps: [
      "Drink at least 8-10 glasses of water daily.",
      "Drink Coconut Water or Butter Milk (Chaas).",
      "Eat water-rich fruits like Watermelon and Cucumber.",
      "Carry water when going out in the sun.",
      "Signs of dehydration: Dark urine, dry mouth, headache.",
    ],
  },
];

export default function LearnScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderModule = (module: any) => (
    <View key={module.id} style={styles.moduleCard}>
      <TouchableOpacity
        style={styles.moduleHeader}
        onPress={() => toggleExpand(module.id)}
      >
        <View style={styles.moduleHeaderLeft}>
          <View style={styles.iconContainer}>{module.icon}</View>
          <View>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>
          </View>
        </View>
        {expandedId === module.id ? (
          <ChevronUp size={20} color="gray" />
        ) : (
          <ChevronDown size={20} color="gray" />
        )}
      </TouchableOpacity>

      {expandedId === module.id && (
        <View style={styles.moduleContent}>
          <Text style={styles.guidelinesTitle}>Guidelines:</Text>
          {module.steps.map((step: string, index: number) => (
            <View key={index} style={styles.stepRow}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Knowledge Base</Text>
      <Text style={styles.subtitle}>Your offline health guide.</Text>

      <Text style={styles.sectionTitle}>Emergency Procedures</Text>
      <View style={styles.moduleList}>{modules.map(renderModule)}</View>

      <Text style={styles.sectionTitle}>Daily Health & Diet</Text>
      <View style={styles.moduleListLast}>{dietModules.map(renderModule)}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7280",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  moduleList: {
    marginBottom: 32,
  },
  moduleListLast: {
    paddingBottom: 40,
  },
  moduleCard: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    overflow: "hidden",
    marginBottom: 16,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    justifyContent: "space-between",
  },
  moduleHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    backgroundColor: "#ffffff",
    padding: 8,
    borderRadius: 9999,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  moduleDescription: {
    color: "#6b7280",
    fontSize: 12,
  },
  moduleContent: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    backgroundColor: "#ffffff",
  },
  guidelinesTitle: {
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 8,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bulletPoint: {
    fontWeight: "bold",
    color: "#00b894",
    marginRight: 8,
  },
  stepText: {
    color: "#374151",
    flex: 1,
  },
});
