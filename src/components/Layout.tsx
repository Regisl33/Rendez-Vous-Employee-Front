import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SideNav from "./SideNav";

const Layout = () => {
  const content = (
    <div className="layout-container">
      <Header />
      <SideNav />
      <main className="main-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
  return content;
};

export default Layout;
