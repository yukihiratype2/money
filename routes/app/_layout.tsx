import { PageProps } from "$fresh/server.ts";
import Header from "../../islands/Header.tsx";

export default function Layout({ Component, state }: PageProps) {
  // do something with state here
  return (
    <div className="kksk">
      <Header></Header>
      <Component />
    </div>
  );
}