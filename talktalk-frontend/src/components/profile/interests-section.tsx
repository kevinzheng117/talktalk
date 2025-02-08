import { Book } from "lucide-react";

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
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contentCategories } from "@/lib/constants";
import { Key } from "react";

export function InterestsSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5" />
          Content Interests
        </CardTitle>
        <CardDescription>
          Select a category of content you&apos;re interested in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormField
          name="interests"
          render={({ field }) => (
            <FormItem>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Add an interest" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {contentCategories.map((category) => (
                    <SelectItem
                      key={category.value}
                      value={category.value}
                      disabled={field.value === category.value}
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* <div className="flex flex-wrap gap-2 pt-2">
                {field.value && (
                    <Badge
                      variant="darkPurple"
                      className="cursor-pointer"
                      onClick={() => {
                        field.onChange(null);
                      }}
                    >
                      {contentCategories.find((c) => c.value === field.value)?.label}
                      <span className="ml-1">×</span>
                    </Badge>
                )}
              </div> */}
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
