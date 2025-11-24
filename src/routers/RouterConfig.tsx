import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import { TourMain } from '../pages/Tour/TourMain';
import { PaymentMain } from '../pages/Payment/PaymentInfo/PaymentMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import PromotionMain from '../pages/Promotion/PromotionMain';
import PaymentCardMain from '../pages/Payment/PaymentCard/PaymentCardMain';
import QRPaymentPage from '../pages/Payment/PaymentQR/PaymentQRMain';
import TourTikket from '../pages/Tour/TourTikket/TourTikketPage';
import TourDetailMain from '../pages/Tour/Tourdetail/TourdetailMain';

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
                element: <QRPaymentPage/>,
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
]);

export const RouterConfig = () => {
  return <RouterProvider router={router} />;
};
