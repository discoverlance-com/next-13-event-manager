import { cn } from "~/lib/utils";

type Props = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const AppButton = ({ className, children, ...props }: Props) => {
  return (
    <button
      className={cn(
        "block rounded-lg bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500 px-5 py-2 font-medium text-white transition hover:bg-slate-500 hover:bg-gradient-to-l active:text-opacity-75",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;
