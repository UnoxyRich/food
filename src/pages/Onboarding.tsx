import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Dumbbell, Leaf as LeafIcon, Scale } from "lucide-react";
import { toast } from "sonner";

const identities = [
  { id: "weight-loss", label: "Lose Weight", icon: Scale, color: "text-red-500" },
  { id: "fitness", label: "Fitness & Muscle", icon: Dumbbell, color: "text-blue-500" },
  { id: "eco", label: "Eco-Conscious", icon: LeafIcon, color: "text-green-500" },
  { id: "balanced", label: "Balanced Health", icon: Heart, color: "text-purple-500" },
];

const sampleDishes = [
  { id: 1, name: "Grilled Salmon", category: "Protein", image: "🐟" },
  { id: 2, name: "Quinoa Bowl", category: "Grains", image: "🥗" },
  { id: 3, name: "Chicken Salad", category: "Salads", image: "🥙" },
  { id: 4, name: "Tofu Stir-fry", category: "Vegan", image: "🥘" },
  { id: 5, name: "Greek Yogurt", category: "Dairy", image: "🥛" },
  { id: 6, name: "Berry Smoothie", category: "Drinks", image: "🫐" },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedIdentity, setSelectedIdentity] = useState("");
  const [username, setUsername] = useState("");
  const [goals, setGoals] = useState("");
  const [preferences, setPreferences] = useState("");
  const [favoriteDishes, setFavoriteDishes] = useState<number[]>([]);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 1 && !selectedIdentity) {
      toast.error("Please select an identity");
      return;
    }
    if (step === 2 && !username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (step === 3 && !goals.trim()) {
      toast.error("Please specify your goals");
      return;
    }
    if (step === 4 && !preferences.trim()) {
      toast.error("Please add your taste preferences");
      return;
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const profile = {
      identity: selectedIdentity,
      username,
      goals,
      preferences,
      favoriteDishes,
    };
    localStorage.setItem("userProfile", JSON.stringify(profile));
    localStorage.removeItem("needsOnboarding");
    toast.success("Profile created successfully!");
    navigate("/");
  };

  const toggleDish = (dishId: number) => {
    setFavoriteDishes((prev) =>
      prev.includes(dishId) ? prev.filter((id) => id !== dishId) : [...prev, dishId]
    );
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>

        <Card className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Choose Your Identity</h2>
                <p className="text-muted-foreground">What's your primary health goal?</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {identities.map((identity) => (
                  <button
                    key={identity.id}
                    onClick={() => setSelectedIdentity(identity.id)}
                    className={`p-6 rounded-lg border-2 transition-all ${
                      selectedIdentity === identity.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <identity.icon className={`w-8 h-8 mx-auto mb-2 ${identity.color}`} />
                    <p className="font-medium text-foreground">{identity.label}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">What's Your Name?</h2>
                <p className="text-muted-foreground">Choose a username or nickname</p>
              </div>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Tell Us Your Goals</h2>
                <p className="text-muted-foreground">
                  What do you want to achieve? (e.g., lose weight, build muscle, eat eco-friendly)
                </p>
              </div>
              <Textarea
                placeholder="I want to..."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Your Taste Preferences</h2>
                <p className="text-muted-foreground">
                  Share your food preferences, allergies, or dislikes
                </p>
              </div>
              <Textarea
                placeholder="I like spicy food, dislike mushrooms, prefer Asian cuisine..."
                value={preferences}
                onChange={(e) => setPreferences(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Favorite Dishes (Optional)</h2>
                <p className="text-muted-foreground">Select dishes you love</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {sampleDishes.map((dish) => (
                  <button
                    key={dish.id}
                    onClick={() => toggleDish(dish.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-center ${
                      favoriteDishes.includes(dish.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <div className="text-3xl mb-2">{dish.image}</div>
                    <p className="text-sm font-medium text-foreground">{dish.name}</p>
                    <p className="text-xs text-muted-foreground">{dish.category}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)} className="flex-1">
                Back
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1">
              {step === totalSteps ? "Complete" : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
