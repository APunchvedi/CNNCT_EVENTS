import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./router/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignInFrom";
import SignUp from "./pages/SignupForm";
import LayoutPage from "./components/Sidebar"; 

import Booking from "./components/Booking";
import Availability from "./components/Availability";
import Setting from "./components/Setting";

// Meeting Pages (Under Booking)
import UpcomingMeetings from "./pages/UpcomingMeetings";
import PendingMeetings from "./pages/PendingMeetings";
import CanceledMeetings from "./pages/CanceledMeetings";
import PastMeetings from "./pages/PastMeetings";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import PreferencesForm from "./pages/PreferencesForm";
import EditEvents from "./components/EditEvents";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { index: true, element: <LandingPage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "username", element: <PreferencesForm/> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <LayoutPage />, // Sidebar Layout
            children: [
              { path: "events", element: <Events /> },
              { path: "booking", element: <Booking />, 
                children: [
                  { path: "upcoming", element: <UpcomingMeetings /> },
                  { path: "pending", element: <PendingMeetings /> },
                  { path: "canceled", element: <CanceledMeetings /> },
                  { path: "past", element: <PastMeetings /> },
                ],
              },
              { path: "availability", element: <Availability /> },
              { path: "settings", element: <Setting /> },
              { path: "create", element: <CreateEvent /> },
              { path: "edit-event", element: <EditEvents/> },
              
            ],
          },
        ],
      },
    ],
  },
]);

const App = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default App;