"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "@/components/profile/basic-info-section";
import { LanguagesSection } from "@/components/profile/languages-section";
import { IntensitySection } from "@/components/profile/intensity-section";
import { InterestsSection } from "@/components/profile/interests-section";
import { type ProfileFormData, profileFormSchema } from "@/lib/schemas/profile";
import useUser from "@/hooks/useUser";


export default function ProfilePage() {
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: "",
      bio: "",
      targetLanguages: [],
      proficiencyLevels: {},
      learningIntensity: 3,
      interests: [],
    },
  });



  function onSubmit(values: ProfileFormData) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="container max-w-4xl px-10 py-6 space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Language Profile
          </h1>
          <p className="text-muted-foreground">
            Customize your language learning journey
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection />
          <LanguagesSection />
          <IntensitySection />
          <InterestsSection />

          <div className="flex justify-end">
            <Button type="submit" size="lg">
              Save Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
