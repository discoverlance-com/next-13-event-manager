import { type Metadata } from "next";
import Link from "next/link";
import AppButton from "~/components/AppButton";

export const metadata: Metadata = {
  title: "Login - EMS",
};

export default async function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-5xl font-bold">Login</h1>

      <p>
        Don't have an account yet?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>

      <section className="bg-white">
        <div className="lg:grid lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Pattern"
              src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </aside>

          <div className="flex items-center lg:col-span-7 lg:py-12 xl:col-span-6">
            <div>
              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    type="password"
                    id="Password"
                    name="password"
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <AppButton type="submit">Login</AppButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
