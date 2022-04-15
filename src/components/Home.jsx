import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.role === "municipality"
      ? window.location.replace("/municipalityForms")
      : window.location.replace("/preperation");
  }, []);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return <div>Redirecting...</div>;
};

export default Home;
