import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
// import { PaymentMain } from '../pages/Payment/PaymentInfo/PaymentMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import PromotionMain from '../pages/Promotion/PromotionMain';
// import PaymentCardMain from '../pages/Payment/PaymentCard/PaymentCardMain';
import QRPaymentPage from '../pages/Payment/PaymentQR/PaymentQRMain';
import TourDetailMain from '../pages/Tour/Tourdetail/TourdetailMain';
import { TourMain } from '../pages/Tour/tourMain/TourMain';
import TourTikket from '../pages/Tour/tourTikket/TourTikketPage';
import NotFoundPage from '../pages/404';
import AdminLayout from '../pages/Admin/AdminLayout';
import Dashboard from '../pages/Admin/components/Dashboard';
import LocationManager from '../pages/Admin/components/LocationManager';
import CategoryManager from '../pages/Admin/components/CategoryManager';
import PromotionManager  from '../pages/Admin/components/PromotionManager';
import TourList from '../pages/Admin/components/TourList';
import TourImageManager from '../pages/Admin/components/TourImageManager';
import FavoritesPage from '../pages/Layout/components/FavoritesPage';
import TourScheduleManager from '../pages/Admin/components/TourScheduleManager';
import AccountSettings from '../pages/Settings/SettingMain';
import SettingPromotion from '../pages/Settings/SettingPromotion';

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
                element: <QRPaymentPage />,
            },
            {
                path: 'tour/:id',
                element: <TourDetailMain />
            },
            {
                path: 'ticket/:id',
                element: <TourTikket />
            }, {
                element: <TourTikket/>
            },
            {
                path: 'favorite-tour',
                element: <FavoritesPage/>
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },    {
                path: 'setting',
                element: <AccountSettings />
            },
            {
                path: '/setting/promotion',
                element: <SettingPromotion />
            }
        ],
    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "tour-manager/tours",
                element: <TourList/>
            },
            {
                path: "tour-manager/image",
                element: <TourImageManager/>
            },
            {
                path: "tour-manager/departure",
                element: <TourScheduleManager/>
            },
            {
                path: "category-manager",
                element: <CategoryManager />,
            },
            {
                path: "location-manager",
                element: <LocationManager />,
            },
            {
                path: "promotion-manager",
                element: <PromotionManager />,
            },
            {
                path: "booking-manager",
                element: <div className="p-8"><h1 className="text-2xl font-bold">Booking Manager</h1></div>,
            },
        ],
    },
]);

export const RouterConfig = () => {
    return <RouterProvider router={router} />;
};
