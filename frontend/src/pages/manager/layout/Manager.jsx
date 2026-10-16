import { Outlet } from "react-router-dom";
import Page_header from "../../../components/Page_header";

export default function Manager() {
  return (
    <>
      <div className="flex flex-col w-full">
        <Page_header />
        <main className="w-full my-3.5">
          <Outlet />
        </main>
      </div>
    </>
  );
}
