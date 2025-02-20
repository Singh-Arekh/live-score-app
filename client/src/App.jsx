import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout"; // Import the Layout component
import Standings from "./components/Standing";
import TopScorers from "./components/TopScorers";
import TodayMatches from './components/TodayMatches';
import Home from "./components/Home";
import UpcomingMatches from "./components/UpcomingMatches";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Use Layout for this and other routes
    children: [
      {
        index: true,
        element: <Home />, // Home page as the default page inside Layout
      },
      {
        path: "/score",
        element: <TopScorers />,
      },
      {
        path: "/live",
        element: <TodayMatches />,
      },
      {
        path: "/standings",
        element: <Standings />,
      },
      {
        path: "/upcoming",
        element: <UpcomingMatches />,
      },      
    ],
  },
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
