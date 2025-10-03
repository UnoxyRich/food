import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Leaf, Plus } from "lucide-react";

interface MealCard {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ecoLabel: "A" | "B" | "C" | "D" | "E";
  prepTime: string;
  difficulty: string;
  costBand: "$" | "$$" | "$$$";
  image: string;
}

const mockRecommendations: MealCard[] = [
  {
    id: 1,
    name: "Quinoa Buddha Bowl",
    calories: 450,
    protein: 18,
    carbs: 65,
    fat: 12,
    ecoLabel: "A",
    prepTime: "20 min",
    difficulty: "Easy",
    costBand: "$$",
    image: "🥗",
  },
  {
    id: 2,
    name: "Grilled Salmon & Veggies",
    calories: 520,
    protein: 35,
    carbs: 28,
    fat: 22,
    ecoLabel: "B",
    prepTime: "25 min",
    difficulty: "Medium",
    costBand: "$$$",
    image: "🐟",
  },
  {
    id: 3,
    name: "Lentil Curry",
    calories: 380,
    protein: 16,
    carbs: 58,
    fat: 8,
    ecoLabel: "A",
    prepTime: "30 min",
    difficulty: "Easy",
    costBand: "$",
    image: "🍛",
  },
  {
    id: 4,
    name: "Chicken Stir-fry",
    calories: 420,
    protein: 32,
    carbs: 38,
    fat: 14,
    ecoLabel: "C",
    prepTime: "18 min",
    difficulty: "Easy",
    costBand: "$$",
    image: "🥘",
  },
  {
    id: 5,
    name: "Tofu & Brown Rice",
    calories: 390,
    protein: 20,
    carbs: 52,
    fat: 10,
    ecoLabel: "A",
    prepTime: "22 min",
    difficulty: "Easy",
    costBand: "$",
    image: "🍚",
  },
];

const ecoLabelColors = {
  A: "bg-green-500",
  B: "bg-lime-500",
  C: "bg-yellow-500",
  D: "bg-orange-500",
  E: "bg-red-500",
};

interface MealRecommendationsProps {
  onAddToGroceryList: (mealId: number) => void;
}

export function MealRecommendations({ onAddToGroceryList }: MealRecommendationsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Recommended Next Meals</h3>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockRecommendations.map((meal) => (
          <Card key={meal.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div className="text-4xl">{meal.image}</div>
              <Badge className={`${ecoLabelColors[meal.ecoLabel]} text-white`}>
                Eco {meal.ecoLabel}
              </Badge>
            </div>

            <div>
              <h4 className="font-semibold text-foreground">{meal.name}</h4>
              <p className="text-sm text-muted-foreground">
                {meal.calories} cal • P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {meal.prepTime}
              </div>
              <div className="flex items-center gap-1">
                <Leaf className="w-3 h-3" />
                {meal.difficulty}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                {meal.costBand}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onAddToGroceryList(meal.id)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add to Grocery List
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
