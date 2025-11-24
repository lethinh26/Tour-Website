import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import { TourMain } from '../pages/Tour/tourMain/TourMain';
import { PromotionMain } from '../pages/Promotion/PromotionMain';
import { PaymentMain } from '../pages/Payment/PaymentMain';
import TourTikket from '../pages/Tour/TourTikket/TourTikketPage';
import TourDetailMain from '../pages/Tour/Tourdetail/TourdetailMain';

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
            {
                path: 'tour/:id',
                element: <TourDetailMain/>
            },
            {
                path: 'tour/ticket/:id',
                element: <TourTikket/>
            }
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
