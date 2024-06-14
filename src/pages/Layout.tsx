import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <>
      <>
        <header>The Zoo</header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>Inga djur har skadats under skapandet av detta projekt</p>
        </footer>
      </>
    </>
  );
};
