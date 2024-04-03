import { Navigate, Route, Routes as Router } from "react-router-dom";
import Chat from "./pages/Chat";
import Form from "./pages/Form";
import { useContext } from "react";
import { Context } from "./Context";

const Routes = () => {
  const { user } = useContext(Context);
  return (
    <Router>
      <Route path="/" element={<Form />} />
      {user?.id && user?.name && <Route path="/chat" element={<Chat />} />}
      <Route path="*" element={<Navigate to="/" />} />
    </Router>
  );
};

export default Routes;
