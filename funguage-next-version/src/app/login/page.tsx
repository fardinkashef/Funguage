import LoginForm from "@/components/login/LoginForm";
import Link from "next/link";

export default async function LoginPage(props: {
  searchParams?: Promise<{
    callbackUrl?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const callbackUrl = searchParams?.callbackUrl || "";
  return (
    <div className="w-full sm:w-96 mx-auto">
      <div className="flex flex-col space-y-2 text-center pt-3 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Log in with your email and password
        </p>
      </div>
      <LoginForm callbackUrl={callbackUrl}/>
      <Link href="/register">
        Don&apos;t have an account? Register in here.
      </Link>
    </div>
  );
}
