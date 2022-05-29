import "bootstrap/dist/css/bootstrap.min.css";
import Container from "@mui/material/Container";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";

import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import TopNav from "./components/TopNav";
import MunicipalityAppointments from "./components/MunicipalityAppointments";
import EditForm from "./components/EditForm";
import Preperation from "./components/Preperation";
import Appointment from "./components/Appointment";
import DetailsList from "./components/DetailsList";
import Home from "./components/Home";

import useWindowDimentions from "./tools/windowDimentions";
import ScrollTop from "./tools/ScrollTop";
import { useEffect, useState } from "react";
import { setUserAction } from "./redux/actions/user";
import meUser from "./api/get/meUser";
import { setLoggedInAction } from "./redux/actions/loggedIn";
import refreshToken from "./api/post/refreshToken";
import Loading from "./tools/Loading";
import LanguageHelper from "./tools/LanguageHelper";

const App = () => {
  const { height } = useWindowDimentions();

  const [loading, setLoading] = useState(true);

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
            {/* auth */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* refugee */}
            <Route path="/preperation" element={<Preperation />} />
            {/* <Route
              path="/refugeeForms"
              element={<DetailsList type="validateForms" />}
            /> */}
            <Route path="/refugeeAppointments" element={<Appointment />} />

            {/* municipalicy */}
            <Route
              path="/preparedForms"
              element={<DetailsList type="preparedForms" />}
            />
            <Route
              path="/municipalityForms"
              element={<DetailsList type="municipalityForms" />}
            />
            {/* <Route
              path="/municipalityAppointments"
              element={<MunicipalityAppointments />}
            /> */}

            {/* common */}
            <Route path="/forms/:formId" element={<EditForm />} />
          </Routes>
        </Box>
      </Router>
      {/* <Footer /> */}
      {user?.role !== "municipality" && <LanguageHelper />}
    </Container>
  );
};

export default App;
