import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Leaf, User, Download, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const mockGroceryList = [
  {
    category: "Produce",
    items: ["Spinach (1 bunch)", "Cherry tomatoes (1 pint)", "Avocado (2)", "Bell peppers (3)"],
  },
  {
    category: "Grains",
    items: ["Brown rice (1 lb)", "Quinoa (1 lb)", "Whole wheat bread"],
  },
  {
    category: "Protein",
    items: ["Chicken breast (2 lbs)", "Black beans (2 cans)", "Eggs (1 dozen)", "Tofu (1 block)"],
  },
  {
    category: "Dairy",
    items: ["Greek yogurt (32 oz)", "Almond milk (1 quart)", "Cheese (8 oz)"],
  },
  {
    category: "Condiments",
    items: ["Olive oil", "Soy sauce", "Honey", "Garlic (1 bulb)"],
  },
];

export default function GroceryList() {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleToggleItem = (item: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(item)) {
        newSet.delete(item);
      } else {
        newSet.add(item);
      }
      return newSet;
    });
  };

  const handleExport = () => {
    const listText = mockGroceryList
      .map(
        (category) =>
          `${category.category}:\n${category.items.map((item) => `  - ${item}`).join("\n")}`
      )
      .join("\n\n");

    const blob = new Blob([listText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery-list.txt";
    a.click();
    toast.success("Grocery list downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">NutriScan</h1>
          </button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Grocery List</h2>
            </div>
            <Button onClick={handleExport} variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-4">
            {mockGroceryList.map((category) => (
              <Card key={category.category} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Checkbox
                        checked={checkedItems.has(item)}
                        onCheckedChange={() => handleToggleItem(item)}
                      />
                      <label
                        className={`text-foreground cursor-pointer ${
                          checkedItems.has(item) ? "line-through text-muted-foreground" : ""
                        }`}
                        onClick={() => handleToggleItem(item)}
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
