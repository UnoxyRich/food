import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Droplets, Zap } from "lucide-react";

export function EcoImpactCard() {
  const ecoScore = 72; // Out of 100
  const getScoreColor = (score: number) => {
    if (score >= 70) return "hsl(142 71% 45%)";
    if (score >= 40) return "hsl(45 93% 47%)";
    return "hsl(0 84% 60%)";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return "Excellent";
    if (score >= 40) return "Good";
    return "Needs Improvement";
  };

  return (
    <Card className="p-6 bg-gradient-to-b from-card to-card/80 shadow-[var(--shadow-card)] border-border/50 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Eco-Impact Score</h2>
        <Badge 
          variant="outline" 
          className="px-3 py-1 text-lg font-bold border-2"
          style={{ 
            borderColor: getScoreColor(ecoScore),
            color: getScoreColor(ecoScore)
          }}
        >
          {getScoreLabel(ecoScore)}
        </Badge>
      </div>

      <div className="flex items-center justify-center mb-8">
        <div 
          className="relative w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: `conic-gradient(${getScoreColor(ecoScore)} ${ecoScore}%, hsl(var(--muted)) ${ecoScore}%)`
          }}
        >
          <div className="absolute inset-2 bg-card rounded-full flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold" style={{ color: getScoreColor(ecoScore) }}>
                {ecoScore}
              </div>
              <div className="text-xs text-muted-foreground">/ 100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="p-2 rounded-full bg-primary/10">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Carbon Footprint</p>
            <p className="text-xs text-muted-foreground">2.4 kg CO₂e</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="p-2 rounded-full bg-accent/10">
            <Droplets className="w-5 h-5 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Water Usage</p>
            <p className="text-xs text-muted-foreground">340 liters</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
          <div className="p-2 rounded-full bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Energy Impact</p>
            <p className="text-xs text-muted-foreground">Low</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Tip:</span> Choosing plant-based options can reduce your meal's carbon footprint by up to 73%!
        </p>
      </div>
    </Card>
  );
}
