import { JSX } from "preact";
import clsx from 'npm:clsx';

export function Select(props: JSX.HTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={clsx("peer w-full h-full font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-2 focus:border-2 text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900", props.className)}
    />
  );
}