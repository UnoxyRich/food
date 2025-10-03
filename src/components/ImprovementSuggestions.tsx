import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingDown, Leaf } from "lucide-react";

const mockSuggestions = [
  {
    id: 1,
    type: "swap",
    current: "Beef burger",
    suggested: "Black bean burger",
    benefit: "Save 500g CO₂e",
    extra: "+8g fiber",
    icon: Leaf,
  },
  {
    id: 2,
    type: "reduce",
    current: "White rice (2 cups)",
    suggested: "Brown rice (1.5 cups)",
    benefit: "Lower glycemic index",
    extra: "+3g fiber, -150 cal",
    icon: TrendingDown,
  },
  {
    id: 3,
    type: "add",
    suggested: "Add leafy greens",
    benefit: "Boost vitamins A, C, K",
    extra: "+low calories",
    icon: Lightbulb,
  },
];

export function ImprovementSuggestions() {
  return (
    <Card className="p-6 space-y-4 bg-gradient-to-br from-card to-card/80">
      <div className="flex items-center gap-2">
        <Lightbulb className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">On-Plate Improvements</h3>
      </div>

      <div className="space-y-3">
        {mockSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="p-4 rounded-lg bg-muted/30 border border-border/50 space-y-2"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10 mt-1">
                <suggestion.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 space-y-1">
                {suggestion.current && (
                  <p className="text-sm text-muted-foreground line-through">
                    {suggestion.current}
                  </p>
                )}
                <p className="text-sm font-medium text-foreground">
                  → {suggestion.suggested}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-primary font-medium">{suggestion.benefit}</span>
                  <span className="text-muted-foreground">{suggestion.extra}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Apply Suggestion
            </Button>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border/50">
        <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
          Why these suggestions? Learn more →
        </Button>
      </div>
    </Card>
  );
}
