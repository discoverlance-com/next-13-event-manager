import Link from "next/link";
import { cn } from "~/lib/utils";

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "ref"
  > {
  href: string;
}

const AppLinkButton = ({ className, children, ...props }: Props) => {
  return (
    <Link
      className={cn(
        "inline-block rounded-lg bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 font-medium hover:text-white transition-[background] hover:bg-slate-500 active:text-opacity-75 duration-300",
        className
      )}
      {...props}
    >
      <span className="block rounded-lg bg-white px-5 py-2 hover:bg-transparent">
        {children}
      </span>
    </Link>
  );
};

export default AppLinkButton;
