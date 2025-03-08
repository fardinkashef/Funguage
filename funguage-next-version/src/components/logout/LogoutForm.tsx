import { auth, signOut } from "@/auth";
import { Button } from "../ui/button";

export async function LogoutForm() {
  const session = await auth();
  console.log("this is the session:", session);

  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit">Log Out</Button>
    </form>
  );
}
