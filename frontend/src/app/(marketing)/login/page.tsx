import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { redirectIfAuthenticated } from "~/lib/auth";

export const metadata: Metadata = {
  title: "Login - EMS",
};

export default async function Page() {
  await redirectIfAuthenticated();

  return (
    <div className="space-y-6">
      <h1 className="text-center text-5xl font-bold">Login</h1>

      <p>
        Don&apos;t have an account yet?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>

      <section className="bg-white">
        <div className="lg:grid lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <Image
              alt="Pattern"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
              fill
              priority
            />
          </aside>

          <div className="flex items-center lg:col-span-7 lg:py-12 xl:col-span-6">
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
