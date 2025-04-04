import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Homepage from "../components/Homepage";

export const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Homepage />,
        }
    ]
}]);