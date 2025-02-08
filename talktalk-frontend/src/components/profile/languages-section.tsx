import { Globe } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languagesToLearn, proficiencyLevels } from "@/lib/constants";

export function LanguagesSection() {
  const { watch } = useFormContext();
  const targetLanguage = watch("targetLanguage");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Languages to Learn
        </CardTitle>
        <CardDescription>
          Select the language you want to learn
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          name="targetLanguage"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
                defaultValue={field.value} // Set the default value
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Add a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languagesToLearn.map((language) => (
                    <SelectItem
                      key={language.value}
                      value={language.value}
                      disabled={targetLanguage === language.value}
                    >
                      {language.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <div className="flex flex-wrap gap-2 pt-2">
                {targetLanguage && (
                  <Badge
                    variant="darkPurple"
                    className="cursor-pointer"
                    onClick={() => {
                      field.onChange(null);
                    }}
                  >
                    {languagesToLearn.find((l) => l.value === targetLanguage)?.label}
                    <span className="ml-1">×</span>
                  </Badge>
                )}
              </div> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {targetLanguage && (
          <FormField
            name={`proficiencyLevels.${targetLanguage}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {languagesToLearn.find((l) => l.value === targetLanguage)?.label} Level
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value} // Set the default value
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </CardContent>
    </Card>
  );
}