import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <Outlet />
    </section>
  );
};

export default MainLayout;
