import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Homepage from "../components/Homepage";
import SchoolHomepage from "../components/SchoolHomepage/SchoolHomepage";
import EventDetailsPage from "../components/EventDetailsPage/EventDetailsPage";

export const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Homepage />,
        },
        {
            path: '/schools/:schoolState/:schoolCity/:schoolName/:schoolId',
            element: <SchoolHomepage/>
        },
        {
            path: '/schools/:schoolState/:schoolCity/:schoolName/:schoolId/events/:eventId',
            element: <EventDetailsPage/>
        }
    ]
}]);