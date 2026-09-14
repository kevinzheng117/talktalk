"use client";
import { useEffect, useState } from "react";
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

import { supabase } from "@/lib/supabaseClient";

const demoProfile: ProfileFormData = {
  displayName: "Demo Learner",
  bio: "Building confidence through short daily lessons.",
  targetLanguage: "es",
  proficiencyLevels: { es: "1" },
  learningIntensity: 3,
  interests: "travel",
};

const localProfileKey = "talktalk-demo-profile";

export default function ProfilePage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: demoProfile,
  });


  useEffect(() => {
    const loadLocalProfile = () => {
      try {
        const storedProfile = window.localStorage.getItem(localProfileKey);
        form.reset(storedProfile ? JSON.parse(storedProfile) : demoProfile);
      } catch {
        form.reset(demoProfile);
      }
    };

    async function fetchUserInfo() {
      const userEmail = user?.email;
      if (!userEmail || !supabase) {
        loadLocalProfile();
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_info")
        .select("*")
        .eq("email", userEmail)
        .single();

      if (error) {
        loadLocalProfile();
      } else if (data) {
        form.reset({
          displayName: data.name,
          bio: data.bio || "",
          targetLanguage: data.targetLanguage || "",
          proficiencyLevels: data.proficiency || {},
          learningIntensity: data.intensity || 3,
          interests: data.content_interest || "",
        });
      }

      setLoading(false);
    }

    fetchUserInfo();
  }, [user, form]);

  async function onSubmit(values: ProfileFormData) {
    window.localStorage.setItem(localProfileKey, JSON.stringify(values));

    if (user?.email && supabase) {
      const { error } = await supabase.from("user_info").upsert(
        [
          {
            name: values.displayName,
            email: user.email,
            bio: values.bio,
            targetLanguage: values.targetLanguage,
            proficiency: values.proficiencyLevels,
            intensity: values.learningIntensity,
            content_interest: values.interests,
          },
        ],
        { onConflict: "email" }
      );

      if (error) {
        // The profile is already saved locally for a resilient demo experience.
      }
    }

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  }

  return (
    <div className="container max-w-4xl px-10 py-6 space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>{user?.name ?? "UN"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Language Profile
          </h1>
          <p className="text-muted-foreground">
            Customize your language learning journey
          </p>
          {user?.email && (
            <p className="text-muted-foreground">Email: {user.email}</p>
          )}
        </div>
      </div>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <BasicInfoSection />
          <LanguagesSection />
          <IntensitySection />
          <InterestsSection />

          <div className="flex justify-end">
            <Button type="submit" size="lg" disabled={loading}>
              {loading ? "Loading..." : "Save Profile"}
            </Button>
          </div>
        </form>
      </Form>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
          Preferences successfully saved!
        </div>
      )}
    </div>
  );
}
