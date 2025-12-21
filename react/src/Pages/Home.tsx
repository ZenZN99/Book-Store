import { useEffect } from "react";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";
import { useUserStore } from "../libs/useUserStore";

const HomePage = () => {
  const { user, loadUser } = useUserStore();

  useEffect(() => {
    loadUser();
  }, []);
  return <div>{user ? <Dashboard /> : <Welcome />}</div>;
};

export default HomePage;
