import { Target } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";

export function IntensitySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          Learning Intensity
        </CardTitle>
        <CardDescription>
          How many days per week do you want to learn?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          name="learningIntensity"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="space-y-4">
                  <Slider
                    min={1}
                    max={7}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-muted-foreground text-sm">
                    <span>1 day/week</span>
                    <span>7 days/week</span>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Currently set to: {field.value} days per week
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
