import { redirect } from "next/navigation";
import ArtifactPageIndex from "./ArtifactPageIndex";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Artifact Page | Prasasti",
};

const ArtifactPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  if (!id) {
    redirect("/dashboard?code=missing-artifact-id&message=Missing artifact ID");
  }

  return <ArtifactPageIndex id={id} />;
};

export default ArtifactPage;
