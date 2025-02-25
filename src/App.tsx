import CreateService from "./features/services/components/CreateService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreServices from "./features/services/components/StoreServices";
import UpdateService from "./features/services/components/UpdateService";
import Layout from "./components/Layout";

const App = () => {
  const app = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/services" element={<StoreServices />} />
          <Route path="/services/:servID" element={<UpdateService />} />
          <Route path="/services/add" element={<CreateService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  return app;
};

export default App;
