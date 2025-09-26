export interface Secret {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const gutSecrets: Secret[] = [
  {
    id: 1,
    title: 'Secret #1: Fix the leaks. Energy follows.',
    description: 'Your gut has a lining that absorbs nutrients and keeps toxins out. When this barrier becomes leaky, your body struggles to get fuel from food, leading to fatigue. Repairing your gut barrier is the first step to regaining your energy.',
    image: 'https://images.unsplash.com/photo-1708898817248-5af04ed36f15?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 2,
    title: "Secret #2: Stress isn't just emotional. It's bacterial.",
    description: 'Chronic stress can throw your digestive system into chaos, altering gut bacteria balance and inflaming your GI tract. Calming your nervous system is a direct investment in better digestion and sustained energy.',
    image: 'https://images.unsplash.com/photo-1707386821135-f4417f81dc3a?q=80&w=982&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 3,
    title: "Secret #3: Your diet isn't fueling you. Your microbes are.",
    description: 'Trillions of bacteria in your gut are essential for converting food into energy. A diverse microbiome is key to unlocking the energy from your food. Feed your microbes with prebiotic-rich and fermented foods.',
    image: 'https://images.unsplash.com/photo-1706639447765-8ece81a63f2e?q=80&w=1046&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 4,
    title: "Secret #4: It's not just what you eat. It's when you eat.",
    description: 'Your digestive system has a clock. Align your eating with your body’s natural daily rhythm (circadian rhythm) to reduce digestive stress and boost overall energy output. Regular meal timing is crucial.',
    image: 'https://images.unsplash.com/photo-1615648260252-bd758220c0ce?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 5,
    title: 'Secret #5: Full stomach. Empty energy.',
    description: "Large, heavy meals can overload your digestive system, leading to an energy crash. Eating smaller, nutrient-dense meals allows your digestive system to convert food to energy more efficiently.",
    image: 'https://images.unsplash.com/photo-1684160244466-b89ef03b7638?q=80&w=1025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];
