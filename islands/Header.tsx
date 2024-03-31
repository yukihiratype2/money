function Nav() {
  return (
    <div className="group relative">
      <div className="">Nav</div>
      <div className="hidden group-hover:block absolute right-0 border rounded-md bg-white">
        <ul className="shadow w-40">
          <li className={"px-2 py-1 hover:bg-gray-100"}>
            <a href="/app/user">User</a>
          </li>
          <li className={"px-2 py-1 hover:bg-gray-100"}>
            <a href="/app/account">Account</a>
          </li>
          <li className={"px-2 py-1 hover:bg-gray-100"}>
            <a href="/app/record">Record</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between">
        <div>Logo</div>
        <Nav />
      </div>
    </div>
  );
}