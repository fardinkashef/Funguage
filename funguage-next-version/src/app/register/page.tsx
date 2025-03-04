import RegisterForm from "@/components/register/RegisterForm";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full sm:w-96 mx-auto">
      <div className="flex flex-col space-y-2 text-center pt-3 mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
        <p className="text-sm text-muted-foreground">
          Register with your email and password
        </p>
      </div>
      <RegisterForm />
      <Link href="/login">Already have an account? Log in here.</Link>
    </div>
  );
}
