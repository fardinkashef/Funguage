import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LearningPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login?callbackUrl=/learning");

  return <div>Learning page</div>;
}
