import "./App.css";

import HomePage from "./HomePages/HomePage";
import Header from "./HomePages/header";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./Pages/Form";
import SeeReport from "./Pages/SeeReport";

import Login from "./Auth/Login";
import Reg from "./Auth/Reg";
import Forgot from "./Auth/Forgot";
import Aware from "./Aware/Aware";
import Dummy from "./Aware/Dummy";
import Status from "./Pages/Status";
import Emailverify from "./Pages/Emailverify";
import RuleBased from "./Pages/RuleBased";
import SeeReportBanker from "./Pages/SeeReportBanker";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<SeeReport />} />
        <Route path="/status" element={<Status />} />
        <Route path="/details" element={<SeeReportBanker />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Reg />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/awareness" element={<Aware />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route path="/verify" element={<Emailverify />} />
        <Route path="/rulebased" element={<RuleBased />} />
      </Routes>
    </div>
  );
}

export default App;
