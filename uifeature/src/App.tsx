import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Layout/Header";
import AuthRoutes from "./routes/AuthRoutes";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Layout/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "./hooks/useAuth";
import { Sidebar } from "./components";
import { HomePage, NotFoundPage } from "./pages";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Render Header */}
        <Header />

        <div className="flex flex-grow">
          {isAuthenticated && (
            <div className="hidden md:block ">
              <Sidebar />
            </div>
          )}

          {/* Main Content */}
          <main
            className={`flex-grow p-4 ${isAuthenticated ? "md:ml-64" : ""}`}
          >
            <Routes>
              {/* Unauthenticated users should land on LoginPage */}
              {!isAuthenticated ? (
                <>
                  <Route path="*" element={<HomePage />} />
                  <Route path="/auth/*" element={<AuthRoutes />} />
                </>
              ) : (
                <>
                  {/* Authentication Routes */}

                  {/* Main App Routes */}
                  <Route path="/ucs/*" element={<AppRoutes />} />

                  {/* Global 404 Not Found */}
                  <Route path="*" element={<NotFoundPage />} />
                </>
              )}
            </Routes>
          </main>
        </div>

        {/* Render Footer */}
        <Footer />
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
