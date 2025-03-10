import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const content = (
    <>
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
  return content;
};

export default Layout;
