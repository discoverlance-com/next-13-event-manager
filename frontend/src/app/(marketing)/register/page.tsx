import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import RegisterForm from "./RegisterForm";
import { redirectIfAuthenticated } from "~/lib/auth";

export const metadata: Metadata = {
  title: "Register - EMS",
};

export default async function Page() {
  await redirectIfAuthenticated();

  return (
    <div className="space-y-6">
      <h1 className="text-center text-5xl font-bold">Register</h1>

      <p>
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Login
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

          <div className="flex items-center justify-center sm:pr-16 lg:col-span-7 lg:py-12 xl:col-span-6">
            <div>
              <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Create an account
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Add a new account to allow you manage your events here
              </p>

              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
