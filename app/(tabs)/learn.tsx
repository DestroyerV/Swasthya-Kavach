import { Activity, ChevronDown, ChevronUp, Heart } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const modules = [
  {
    id: 'cpr',
    title: 'CPR (Cardiopulmonary Resuscitation)',
    icon: <Heart size={24} color="#ef4444" />,
    description: 'Life-saving technique for cardiac arrest.',
    steps: [
      'Check for responsiveness. Shake the person gently and shout.',
      'Call for emergency help (108/102 in India) immediately.',
      'Check for breathing. If not breathing, start chest compressions.',
      'Push hard and fast in the center of the chest (100-120 compressions/minute).',
      'Continue compressions until help arrives.'
    ]
  },
  {
    id: 'bleeding',
    title: 'Severe Bleeding',
    icon: <Activity size={24} color="#ef4444" />,
    description: 'How to stop heavy bleeding.',
    steps: [
      'Apply direct pressure on the wound with a clean cloth.',
      'Maintain pressure for at least 10-15 minutes.',
      'If blood soaks through, add more cloth without removing the first one.',
      'Raise the injured part above the heart level if possible.',
      'Keep the person warm and calm.'
    ]
  },
  {
    id: 'snakebite',
    title: 'Snake Bite',
    icon: <Activity size={24} color="#f59e0b" />,
    description: 'Immediate actions for snake bites.',
    steps: [
      'Keep the person calm and still to slow the spread of venom.',
      'Remove jewelry or tight clothing near the bite.',
      'Position the bite below heart level.',
      'Clean the wound with soap and water.',
      'Do NOT cut the wound or suck out the venom. Transport to hospital immediately.'
    ]
  }
];

const dietModules = [
  {
    id: 'anemia_diet',
    title: 'Diet for Anemia',
    icon: <Activity size={24} color="#10b981" />,
    description: 'Iron-rich foods to boost hemoglobin.',
    steps: [
      'Eat Green Leafy Vegetables: Spinach, Fenugreek (Methi).',
      'Consume Jaggery (Gud) and Peanuts daily.',
      'Include Pulses and Lentils (Dal) in every meal.',
      'Vitamin C (Lemon, Amla) helps absorb Iron.',
      'Avoid tea/coffee immediately after meals.'
    ]
  },
  {
    id: 'hydration',
    title: 'Hydration Tips',
    icon: <Activity size={24} color="#3b82f6" />,
    description: 'Staying hydrated in hot weather.',
    steps: [
      'Drink at least 8-10 glasses of water daily.',
      'Drink Coconut Water or Butter Milk (Chaas).',
      'Eat water-rich fruits like Watermelon and Cucumber.',
      'Carry water when going out in the sun.',
      'Signs of dehydration: Dark urine, dry mouth, headache.'
    ]
  }
];

export default function LearnScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const renderModule = (module: any) => (
    <View key={module.id} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden mb-4">
      <TouchableOpacity 
        className="flex-row items-center p-4 justify-between"
        onPress={() => toggleExpand(module.id)}
      >
        <View className="flex-row items-center space-x-3">
          <View className="bg-white p-2 rounded-full shadow-sm">
              {module.icon}
          </View>
          <View>
              <Text className="text-lg font-bold text-gray-800">{module.title}</Text>
              <Text className="text-gray-500 text-xs">{module.description}</Text>
          </View>
        </View>
        {expandedId === module.id ? <ChevronUp size={20} color="gray" /> : <ChevronDown size={20} color="gray" />}
      </TouchableOpacity>

      {expandedId === module.id && (
        <View className="p-4 pt-0 border-t border-gray-200 bg-white">
          <Text className="font-semibold mb-2 mt-2">Guidelines:</Text>
          {module.steps.map((step: string, index: number) => (
            <View key={index} className="flex-row mb-2">
              <Text className="font-bold text-primary mr-2">•</Text>
              <Text className="text-gray-700 flex-1">{step}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-gray-900 mb-2">Knowledge Base</Text>
      <Text className="text-gray-500 mb-6">
        Your offline health guide.
      </Text>

      <Text className="text-xl font-bold text-gray-800 mb-4">Emergency Procedures</Text>
      <View className="space-y-4 mb-8">
        {modules.map(renderModule)}
      </View>

      <Text className="text-xl font-bold text-gray-800 mb-4">Daily Health & Diet</Text>
      <View className="space-y-4 pb-10">
        {dietModules.map(renderModule)}
      </View>
    </ScrollView>
  );
}
