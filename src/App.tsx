import CreateService from "./app/features/services/components/CreateService";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import StoreServices from "./app/features/services/components/StoreServices";
import UpdateService from "./app/features/services/components/UpdateService";

const App = () => {
  const app = (
    <BrowserRouter>
      <Routes>
        <Route path="/services" element={<StoreServices />} />
        <Route path="/services/:servID" element={<UpdateService />} />
        <Route path="/services/add" element={<CreateService />} />
      </Routes>
    </BrowserRouter>
  );

  return app;
};

export default App;
