import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - EMS",
};

export default async function Page() {
  return (
    <div className="space-y-6">
      <h1 className="text-center text-5xl font-bold">About Us</h1>

      <p>
        Our event management system website is dedicated to providing seamless
        and efficient solutions for planning and organizing events.
      </p>
      <p>
        With a user-friendly interface and powerful features, we aim to simplify
        the event management process. From registration to ticketing, our
        platform offers a comprehensive suite of tools to ensure a successful
        event.
      </p>

      <p>
        With our experience and expertise, we strive to deliver exceptional
        service and exceed our clients&apos; expectations. Whether it&apos;s a
        corporate conference or a social gathering, our event management system
        is designed to streamline the entire event planning process and create
        unforgettable experiences.
      </p>
    </div>
  );
}
