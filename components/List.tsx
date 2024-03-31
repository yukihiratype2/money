import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import clsx from "npm:clsx@2.1.0";

export function List(props: JSX.HTMLAttributes<HTMLUListElement>) {
  return (
    <ul
      {...props}
      class={clsx("flex flex-col space-y-1", props.className)}
    />
  );
}

export function ListItem(props: JSX.HTMLAttributes<HTMLLIElement>) {  
  return (
    <li
      {...props}
      class={clsx("px-4 py-2 border rounded-lg", props.className)}
    />
  );
}