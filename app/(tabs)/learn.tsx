import { Colors } from "@/constants/theme";
import { Activity, ChevronDown, ChevronUp, Heart } from "lucide-react-native";
import { useState } from "react";
import {
  SafeAreaView,
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
    // Using theme colors instead of hardcoded red
    icon: <Heart size={24} color={Colors.light.primary} />,
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
    icon: <Activity size={24} color={Colors.light.primary} />,
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
    icon: <Activity size={24} color={Colors.light.primary} />,
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
    icon: <Activity size={24} color={Colors.light.primary} />,
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
    icon: <Activity size={24} color={Colors.light.primary} />,
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
        activeOpacity={0.7}
      >
        <View style={styles.moduleHeaderLeft}>
          <View style={styles.iconContainer}>{module.icon}</View>
          <View style={{ flex: 1 }}>
            <Text style={styles.moduleTitle}>{module.title}</Text>
            <Text style={styles.moduleDescription}>{module.description}</Text>
          </View>
        </View>
        {expandedId === module.id ? (
          <ChevronUp size={20} color={Colors.light.textSecondary} />
        ) : (
          <ChevronDown size={20} color={Colors.light.textSecondary} />
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.headerTitle}>Knowledge Base</Text>
        <Text style={styles.headerSubtitle}>Your offline health guide.</Text>

        <Text style={styles.sectionTitle}>Emergency Procedures</Text>
        <View style={styles.moduleList}>{modules.map(renderModule)}</View>

        <Text style={styles.sectionTitle}>Daily Health & Diet</Text>
        <View style={styles.moduleListLast}>
          {dietModules.map(renderModule)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
    marginTop: 10,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  moduleList: {
    marginBottom: 32,
  },
  moduleListLast: {
    paddingBottom: 40,
  },
  moduleCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginBottom: 16,
    // Soft shadow
    shadowColor: "#64748B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    overflow: "hidden",
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
    paddingRight: 16,
  },
  iconContainer: {
    backgroundColor: Colors.light.background,
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  moduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 2,
  },
  moduleDescription: {
    color: Colors.light.textSecondary,
    fontSize: 13,
  },
  moduleContent: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: Colors.light.card,
  },
  guidelinesTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 12,
    marginTop: 8,
  },
  stepRow: {
    flexDirection: "row",
    marginBottom: 8,
    paddingRight: 8,
  },
  bulletPoint: {
    fontWeight: "bold",
    color: Colors.light.primary,
    marginRight: 8,
    fontSize: 16,
    lineHeight: 20,
  },
  stepText: {
    color: Colors.light.textSecondary,
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
