import { useState } from "react";
import { Camera, Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface UploadSectionProps {
  onAnalyze: () => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [image, setImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      toast.error("Please upload an image first");
      return;
    }
    toast.success("Analyzing your meal...");
    setTimeout(() => {
      onAnalyze();
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="p-8 bg-gradient-to-b from-card to-card/80 shadow-[var(--shadow-card)] border-border/50 backdrop-blur-sm">
        {!image ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Upload Your Meal</h3>
              <p className="text-sm text-muted-foreground">
                Take a photo or upload an image to analyze nutrition and eco-impact
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <label htmlFor="camera-input">
                <Button variant="outline" className="w-full sm:w-auto cursor-pointer" asChild>
                  <span>
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </span>
                </Button>
                <input
                  id="camera-input"
                  type="file"
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <label htmlFor="file-input">
                <Button variant="outline" className="w-full sm:w-auto cursor-pointer" asChild>
                  <span>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </span>
                </Button>
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={image}
                alt="Uploaded meal"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setImage(null)}
              >
                Remove
              </Button>
              <Button
                className="flex-1 bg-primary hover:bg-primary/90"
                onClick={handleAnalyze}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Meal
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
