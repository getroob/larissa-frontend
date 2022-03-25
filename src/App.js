import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";

import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import TopNav from "./components/TopNav";
import Municipality from "./components/Municipality";
import MunicipalityForm from "./components/MunicipalityForm";
import Preperation from "./components/Preperation";
import RefugeeForm from "./components/RefugeeForm";
import Appointment from "./components/Appointment";
import Home from "./components/Home";

import useWindowDimentions from "./tools/windowDimentions";
import ScrollTop from "./tools/ScrollTop";
import { useEffect, useState } from "react";
import { setUserAction } from "./redux/actions/user";
import meUser from "./api/get/meUser";
import { setLoggedInAction } from "./redux/actions/loggedIn";
import refreshToken from "./api/post/refreshToken";
import Loading from "./tools/Loading";

const App = () => {
  const { height } = useWindowDimentions();

  const [loading, setLoading] = useState(true);

  const loggedIn = useSelector((state) => state.loggedIn);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async (retry) => {
    try {
      const res = await meUser();
      if (res) {
        dispatch(setUserAction(res));
        dispatch(setLoggedInAction(true));
      }
    } catch (error) {
      const { text, status } = JSON.parse(error?.message);
      console.log(text, status);
      if (retry) {
        try {
          await refreshToken();
          await getUser(false);
        } catch (error) {
          console.log(error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => void getUser(true), []);

  if (loading) return <Loading />;

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        minHeight: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Router>
        <TopNav />
        <Box
          sx={{
            mt: 10,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/preperation" element={<Preperation />} />
            <Route
              path="/municipalityForm/:formId"
              element={<MunicipalityForm />}
            />
            <Route path="/refugeeForm" element={<RefugeeForm />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/municipality" element={<Municipality />} />
          </Routes>
        </Box>
      </Router>
      <Footer />
      <ScrollTop />
    </Container>
  );
};

export default App;
