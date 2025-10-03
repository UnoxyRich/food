import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { UploadSection } from "@/components/UploadSection";
import { NutritionCard } from "@/components/NutritionCard";
import { EcoImpactCard } from "@/components/EcoImpactCard";
import { MealRecommendations } from "@/components/MealRecommendations";
import { ImprovementSuggestions } from "@/components/ImprovementSuggestions";
import { Button } from "@/components/ui/button";
import { Leaf, User, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const needsOnboarding = localStorage.getItem("needsOnboarding");

    if (!isAuth) {
      navigate("/auth");
      return;
    }

    if (needsOnboarding) {
      navigate("/onboarding");
    }
  }, [navigate]);

  const handleAddToGroceryList = (mealId: number) => {
    toast.success("Added to grocery list!");
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Leaf className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">NutriScan</h1>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="icon" onClick={() => navigate("/grocery-list")}>
              <ShoppingCart className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigate("/profile")}>
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-[var(--gradient-hero)]">
        <div className="container mx-auto px-4 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Scan Your Meal
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the nutritional value and environmental impact of your food in seconds
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <UploadSection onAnalyze={() => setShowResults(true)} />

          {showResults && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid md:grid-cols-2 gap-6">
                <NutritionCard />
                <EcoImpactCard />
              </div>

              <ImprovementSuggestions />

              <MealRecommendations onAddToGroceryList={handleAddToGroceryList} />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 space-y-4">
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Make informed choices for your health and the planet 🌱</p>
            <p className="text-xs">
              This app provides general information only; not medical advice. Data from USDA, FAO, etc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
