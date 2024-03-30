import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function FormItem(props: JSX.HTMLAttributes<HTMLDivElement> & { label: string }) {
  return (
    <div
      {...props}
      class=""
    >
      <label class="block">{props.label}</label>
      {props.children}
    </div>
  );
}
