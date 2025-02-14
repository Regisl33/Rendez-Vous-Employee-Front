import CreateService from "./app/features/services/CreateService";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const app = (
    <BrowserRouter>
      <Routes>
        <Route path="/services">
          <Route path="/services/:serviceID" />
          <Route path="/services/add" element={<CreateService />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );

  return app;
};

export default App;
