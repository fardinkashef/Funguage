import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LearningPage() {
  const session = await auth();
  const user = session?.user;

  if (!user) redirect("/login?callbackUrl=/learning");
  redirect("/learning/browse");

  return (
    <div className="w-full flex justify-center items-center">
      <h1 className="text-4xl font-bold mt-20">This is Learning page!</h1>
    </div>
  );
}
