import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface NutritionData {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
  color: string;
}

const mockNutritionData: NutritionData[] = [
  { name: "Calories", amount: 520, unit: "kcal", dailyValue: 26, color: "hsl(var(--primary))" },
  { name: "Protein", amount: 24, unit: "g", dailyValue: 48, color: "hsl(var(--accent))" },
  { name: "Carbs", amount: 58, unit: "g", dailyValue: 19, color: "hsl(142 71% 65%)" },
  { name: "Fat", amount: 18, unit: "g", dailyValue: 23, color: "hsl(174 72% 70%)" },
];

export function NutritionCard() {
  return (
    <Card className="p-6 bg-gradient-to-b from-card to-card/80 shadow-[var(--shadow-card)] border-border/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Nutrition Breakdown</h2>
      
      <div className="space-y-6">
        {mockNutritionData.map((item) => (
          <div key={item.name} className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="font-medium text-foreground">{item.name}</span>
              <span className="text-sm text-muted-foreground">
                {item.amount}{item.unit} ({item.dailyValue}% DV)
              </span>
            </div>
            <Progress 
              value={item.dailyValue} 
              className="h-2"
              style={{ 
                // @ts-ignore
                "--progress-background": item.color 
              }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Fiber</p>
            <p className="font-semibold text-foreground">6g</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sugar</p>
            <p className="font-semibold text-foreground">12g</p>
          </div>
          <div>
            <p className="text-muted-foreground">Sodium</p>
            <p className="font-semibold text-foreground">420mg</p>
          </div>
          <div>
            <p className="text-muted-foreground">Cholesterol</p>
            <p className="font-semibold text-foreground">35mg</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
