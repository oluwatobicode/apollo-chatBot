import "./index.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ResetPasswordProvider } from "./contexts/ResetPasswordProvider";
import { Toaster } from "react-hot-toast";

import Apollo from "./pages/Apollo";
import Start from "./pages/Start";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./ui/ProtectedRoute";
import { setUser } from "./features/auth/authSlice";
import { supabase } from "./services/supabaseClient";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./app/store";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // On initial load, check session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(
          setUser({ id: session.user.id, email: session.user.email ?? "" })
        );
      }
    });

    // Listen to auth state changes (e.g., logout)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          dispatch(
            setUser({ id: session.user.id, email: session.user.email ?? "" })
          );
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    const intent = sessionStorage.getItem("googleLoginIntent");

    if (intent === "true") {
      sessionStorage.removeItem("googleLoginIntent");
    }
  }, []);

  return (
    <ResetPasswordProvider>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 5000,
          },
          error: {
            duration: 8000,
          },
          style: {
            background: "#ffff",
            color: "#000",
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/start" element={<Start />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          {/* the rest  */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Apollo />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/chat" element={<Apollo />} /> */}
          {/* <Route path="/chat/id" element={""} /> */}
        </Routes>
      </BrowserRouter>
    </ResetPasswordProvider>
  );
}

export default App;
