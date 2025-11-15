import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import { TourMain } from '../pages/Tour/TourMain';
import { PromotionMain } from '../pages/Promotion/PromotionMain';
import { PaymentMain } from '../pages/Payment/PaymentMain';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <></>,
            },
            {
                path: "tour",
                element: <TourMain />,
            },
            {
                path: "promotion",
                element: <PromotionMain />,
            },
            {
                path: "payment/:id",
                element: <PaymentMain />,
            },
        ],
    },
    {
        path: "/test",
        element: <PaymentMain />,
    },
]);

export const RouterConfig = () => {
    return <RouterProvider router={router} />;
};
