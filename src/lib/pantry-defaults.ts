// Tiered pantry staples by food palette
// Tier 1: "Always available" - shelf life 6+ months
// Tier 2: "Usually available" - shelf life 2-4 weeks

export interface PantryDefaults {
  always: string[];
  usually: string[];
}

export const PANTRY_DEFAULTS: Record<string, PantryDefaults> = {
  'indian': {
    always: [
      'Rice', 'Atta (wheat flour)', 'Toor dal', 'Moong dal', 'Chana dal',
      'Cooking oil', 'Ghee', 'Salt', 'Turmeric', 'Cumin seeds', 'Cumin powder',
      'Coriander powder', 'Red chili powder', 'Garam masala', 'Mustard seeds',
      'Sugar', 'Tea', 'Black pepper', 'Bay leaves', 'Hing (asafoetida)',
    ],
    usually: [
      'Onions', 'Potatoes', 'Garlic', 'Ginger', 'Green chillies',
      'Tomatoes', 'Lemons', 'Coriander leaves',
    ],
  },
  'south-indian': {
    always: [
      'Rice', 'Rice flour', 'Urad dal', 'Toor dal', 'Coconut oil',
      'Curry leaves', 'Mustard seeds', 'Tamarind', 'Sambar powder',
      'Rasam powder', 'Idli rava', 'Salt', 'Turmeric', 'Red chili powder',
      'Cumin seeds', 'Hing (asafoetida)', 'Black pepper', 'Cooking oil',
      'Jaggery', 'Chana dal', 'Sugar',
    ],
    usually: [
      'Onions', 'Tomatoes', 'Garlic', 'Ginger', 'Green chillies',
      'Coconut (fresh/desiccated)', 'Coriander leaves', 'Drumstick',
    ],
  },
  'continental': {
    always: [
      'Pasta', 'Olive oil', 'Butter', 'Salt', 'Black pepper',
      'Garlic powder', 'All-purpose flour', 'Sugar', 'Dried herbs (oregano, basil, thyme)',
      'Soy sauce', 'Vinegar', 'Rice', 'Cooking oil',
    ],
    usually: [
      'Bread', 'Garlic', 'Onions', 'Tomatoes', 'Cheese',
      'Eggs', 'Milk', 'Ketchup',
    ],
  },
  'mixed': {
    always: [
      'Rice', 'Pasta', 'Atta (wheat flour)', 'Cooking oil', 'Olive oil',
      'Butter/Ghee', 'Salt', 'Black pepper', 'Turmeric', 'Cumin',
      'Red chili powder', 'Garam masala', 'Soy sauce', 'Sugar',
      'Dried herbs (oregano, basil)', 'Dal (any type)',
    ],
    usually: [
      'Onions', 'Potatoes', 'Garlic', 'Ginger', 'Tomatoes',
      'Green chillies', 'Lemons', 'Bread', 'Eggs',
    ],
  },
};

export const COMMON_ALLERGIES = [
  'Lactose/Dairy',
  'Gluten',
  'Nuts',
  'Soy',
  'Shellfish',
  'Eggs',
  'Fish',
  'Sesame',
];

export const COMMON_DISLIKES = [
  'Karela (bitter gourd)',
  'Baingan (eggplant)',
  'Mushroom',
  'Capsicum (bell pepper)',
  'Beetroot',
  'Lauki (bottle gourd)',
  'Tinda',
  'Bhindi (okra)',
  'Raw onion',
  'Coconut',
];

export const COOKING_EQUIPMENT = [
  { id: 'gas-stove', label: 'Gas Stove', default: true },
  { id: 'pressure-cooker', label: 'Pressure Cooker', default: true },
  { id: 'non-stick-pan', label: 'Non-stick Pan', default: true },
  { id: 'microwave', label: 'Microwave', default: false },
  { id: 'oven', label: 'Oven/OTG', default: false },
  { id: 'air-fryer', label: 'Air Fryer', default: false },
  { id: 'mixer-blender', label: 'Mixer/Blender', default: false },
  { id: 'induction', label: 'Induction Cooktop', default: false },
  { id: 'kadhai', label: 'Kadhai/Wok', default: true },
  { id: 'tawa', label: 'Tawa/Flat Pan', default: true },
];

export const QUICK_PICKS = [
  { id: 'quick', label: 'Something quick', icon: '⚡', prompt: 'a quick, easy meal under 15 minutes' },
  { id: 'protein', label: 'High protein', icon: '💪', prompt: 'a high-protein meal that maximizes protein content' },
  { id: 'comfort', label: 'Comfort food', icon: '🍲', prompt: 'warm, comforting comfort food' },
  { id: 'light', label: 'Something light', icon: '🥗', prompt: 'a light, refreshing meal that is not too heavy' },
  { id: 'surprise', label: 'Surprise me', icon: '🎲', prompt: 'something creative and interesting that I might not have tried before' },
];

export const COMMON_LEFTOVERS = [
  'Dal', 'Rice', 'Roti/Chapati', 'Sabzi (vegetable curry)',
  'Pasta', 'Curry', 'Cooked chicken', 'Boiled eggs',
  'Rajma', 'Chole', 'Sambar', 'Idli batter',
];
