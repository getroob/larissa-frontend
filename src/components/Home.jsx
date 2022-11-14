import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    user?.role === "municipality"
      ? window.location.replace("/municipalityForms")
      : window.location.replace("/preperation");
  }, []);

  useEffect(() => {
    if (!user) window.location.href = "/login";
  }, [user]);

  return <div>{user?.role === "municipality" || lang === 'gr' ? 'Ανακατευθυνση...' : lang === 'fr' ? 'réorienter...' : 'Redirecting...'}</div>;
};

export default Home;
