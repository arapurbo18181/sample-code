import { Navbar } from "app/SidebarRegistry";
import { AppProvider } from "app/appProvider";
import AppRoutes from "modules";

const App = () => {
  return (
    <>
      <AppProvider>
        <Navbar />
        <AppRoutes />
      </AppProvider>
    </>
  );
};

export default App;
