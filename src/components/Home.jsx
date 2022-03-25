import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.role === "municipality"
      ? window.location.replace("/municipalityForms")
      : window.location.replace("/refugeeForms");
  }, []);

  return <div>Home</div>;
};

export default Home;
