import { createBrowserRouter } from "react-router";
import Layout from "./layout";
import Homepage from "../components/Homepage";
import SchoolHomepage from "../components/SchoolHomepage/SchoolHomepage";
import EventDetailsPage from "../components/EventDetailsPage/EventDetailsPage";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import Confirmation from "../components/ConfirmationForms/Confirmation";
import Cancel from "../components/ConfirmationForms/Cancel";
import AdminPanel from "../components/AdminPanel/AdminPanel";
import EditEvent from "../components/EditEvent/EditEvent";
import CreateEvent from "../components/AdminPanel/CreateEvent/CreateEvent";

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
        },
        {
            path: '/checkout',
            element: <CheckoutPage/>
        },
        {
            path: '/orders/confirmation',
            element: <Confirmation/>
        },
        {
            path: '/orders/cancel',
            element: <Cancel/>
        },
        {
            path: '/admin/:adminId/panel',
            element: <AdminPanel/>,
            pathMatch: 'full'
        },
        {
            path: '/schools/:schoolState/:schoolCity/:schoolName/:schoolId/events/:eventId/edit',
            element: <EditEvent/>
        },
        {
            path: '/admin/:adminId/create-event',
            element: <CreateEvent/>
        },
        {
            path: '/forbidden',
            element: <div style={{width: '100%'
                , height: '100vh'
                , fontSize: '100px',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                }}>403: Forbidden</div>
        }
    ]
}]);