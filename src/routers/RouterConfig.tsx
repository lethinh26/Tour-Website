import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import PromotionMain from '../pages/Promotion/PromotionMain';
import QRPaymentPage from '../pages/Payment/PaymentQR/PaymentQRMain';
import TourDetailMain from '../pages/Tour/Tourdetail/TourdetailMain';
import { TourMain } from '../pages/Tour/tourMain/TourMain';
import TourTikket from '../pages/Tour/tourTikket/TourTikketPage';
import NotFoundPage from '../pages/404';
import AdminLayout from '../pages/Admin/AdminLayout';
import LocationManager from '../pages/Admin/components/LocationManager';
import CategoryManager from '../pages/Admin/components/CategoryManager';
import PromotionManager  from '../pages/Admin/components/PromotionManager';
import TourList from '../pages/Admin/components/TourList';
import TourImageManager from '../pages/Admin/components/TourImageManager';
import FavoritesPage from '../pages/Tour/tourFavorite/FavoritesPage';
import TourScheduleManager from '../pages/Admin/components/TourScheduleManager';
import AccountSettings from '../pages/Settings/SettingMain';
import SettingPromotion from '../pages/Settings/SettingPromotion';
import Auth from '../pages/Admin/components/Auth';
import Dashboard from '../pages/Admin/components/Dashboard';

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
                element: (
                    <Auth allowedRoles={["ADMIN", "TOUR_MANAGER"]}>
                        <Dashboard />
                    </Auth>
                ),
            },
            {
                path: "tour-manager/tours",
                element: (
                    <Auth allowedRoles={["ADMIN", "TOUR_MANAGER"]}>
                        <TourList/>
                    </Auth>
                ),
            },
            {
                path: "tour-manager/image",
                element: (
                    <Auth allowedRoles={["ADMIN", "TOUR_MANAGER"]}>
                        <TourImageManager/>
                    </Auth>
                ),
            },
            {
                path: "tour-manager/departure",
                element: (
                    <Auth allowedRoles={["ADMIN", "TOUR_MANAGER"]}>
                        <TourScheduleManager/>
                    </Auth>
                ),
            },
            {
                path: "category-manager",
                element: (
                    <Auth allowedRoles={["ADMIN"]}>
                        <CategoryManager />
                    </Auth>
                ),
            },
            {
                path: "location-manager",
                element: (
                    <Auth allowedRoles={["ADMIN"]}>
                        <LocationManager />
                    </Auth>
                ),
            },
            {
                path: "promotion-manager",
                element: (
                    <Auth allowedRoles={["ADMIN"]}>
                        <PromotionManager />
                    </Auth>
                ),
            },
            {
                path: "booking-manager",
                element: (
                    <Auth allowedRoles={["ADMIN"]}>
                        <div className="p-8"><h1 className="text-2xl font-bold">Booking Manager</h1></div>
                    </Auth>
                ),
            },
        ],
    },
]);

export const RouterConfig = () => {
    return <RouterProvider router={router} />;
};
