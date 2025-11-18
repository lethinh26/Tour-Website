import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import { TourMain } from '../pages/Tour/TourMain';
import { PromotionMain } from '../pages/Promotion/PromotionMain';
import { PaymentMain } from '../pages/Payment/PaymentMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutMain />,
        children: [
            {
                index: true,
                element: <DashboardMain />,
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
]);

export const RouterConfig = () => {
  return <RouterProvider router={router} />;
};
