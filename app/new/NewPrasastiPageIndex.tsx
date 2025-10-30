"use client";

import { Label } from "@/src/ui/shadcn/components/ui/label";
import { Input } from "@/src/ui/shadcn/components/ui/input";
import { Textarea } from "@/src/ui/shadcn/components/ui/textarea";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/ui/shadcn/components/ui/card";
import { Dices } from "lucide-react";
import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getRandomOwnerName,
  getRandomPrasastiName,
} from "@/src/lib/utils/random";
import { PrasastiMetadata } from "@/src/db/idb/schema/metadata";
import { useInsertMetadata } from "@/src/db/idb/hooks/useInsertMetadata";
import { useGetMetadata } from "@/src/db/idb/hooks/useGetMetadata";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const metadataSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  owner: z.string().optional(),
});

const NewPrasastiPageIndex = () => {
  // Form Initialization
  const { control, setValue, handleSubmit } = useForm({
    resolver: zodResolver(metadataSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      description: "",
      owner: "",
    },
  });

  // Validate Metadata
  const {
    data: metadata,
    isLoading: isLoadingMetadata,
    refetch: refetchMetadata,
  } = useGetMetadata();
  const router = useRouter();

  useEffect(() => {
    if (isLoadingMetadata) return;

    if (metadata) {
      router.push("/dashboard");
    }
  }, [metadata, isLoadingMetadata, router]);

  // Mutation
  const { mutate: insert, isPending: isInserting } = useInsertMetadata({
    onSuccess: () => {
      refetchMetadata();
    },
  });

  return (
    <div className="min-h-screen md:min-w-md lg:min-w-lg py-16 bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>New Prasasti</CardTitle>
          <CardDescription>
            Configure your new Prasasti metadata
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((data) => {
              // RHF Validation is unreliable with random (isValid is not updating when random click)
              const validation = metadataSchema.safeParse(data);
              if (!validation.success) return;

              // Construct Metadata
              const metadata: PrasastiMetadata = {
                ...data,
                id: crypto.randomUUID(),
                createdAt: new Date(),
                owner: data?.owner || getRandomOwnerName(),
              };

              insert(metadata);
            })}
            suppressHydrationWarning
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="name">Name</Label>
                <Controller
                  control={control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <div>
                      <Input
                        id="name"
                        placeholder="My Prasasti"
                        {...field}
                        suppressHydrationWarning
                      />
                      {fieldState?.error?.message && (
                        <p className="text-xs text-destructive">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="description">Description</Label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Textarea
                      id="description"
                      placeholder="Description (optional)"
                      rows={1}
                      className="resize-none field-sizing-content max-h-42 scrollbar-none"
                      {...field}
                      suppressHydrationWarning
                    />
                  )}
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="owner">Owner Name</Label>

                <Controller
                  control={control}
                  name="owner"
                  render={({ field }) => (
                    <Input
                      id="owner"
                      placeholder="Jane Doe (Optional)"
                      {...field}
                      suppressHydrationWarning
                    />
                  )}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isLoadingMetadata || isInserting}
                >
                  Create
                </Button>
                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => {
                    setValue("name", getRandomPrasastiName());
                    setValue("owner", getRandomOwnerName());
                  }}
                  disabled={isLoadingMetadata || isInserting}
                >
                  <Dices />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewPrasastiPageIndex;
