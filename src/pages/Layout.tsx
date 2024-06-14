import { Outlet } from "react-router-dom";
import "./Layout.scss";

export const Layout = () => {
  return (
    <>
      <>
        <header>
          <img src="/icons8-zoo-100.png" alt="zoo Icon" />
          <h1>The Zoo</h1>
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>Inga djur skadades under skapandet av detta projekt</p>
        </footer>
      </>
    </>
  );
};
