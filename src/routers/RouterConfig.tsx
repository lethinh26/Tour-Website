import { createBrowserRouter, RouterProvider } from 'react-router'
import { LayoutMain } from '../pages/Layout/LayoutMain';
import DashboardMain from '../pages/Dashboard/DashboardMain';
import PromotionMain from '../pages/Promotion/PromotionMain';
import QRPaymentPage from '../pages/Payment/PaymentQR/PaymentQRMain';
import { PaymentMain } from '../pages/Payment/PaymentInfo/PaymentMain';
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
import BookingManager from '../pages/Admin/components/BookingManager';
import AccountSettings from '../pages/Settings/SettingMain';
import SettingPromotion from '../pages/Settings/SettingPromotion';
import Auth from '../pages/Admin/components/Auth';
import Dashboard from '../pages/Admin/components/Dashboard';
import PaymentSuccess from '../pages/Payment/PaymentSuccess';
import PaymentError from '../pages/Payment/PaymentError';
import PaymentCancel from '../pages/Payment/PaymentCancel';
import TransactionHistory from '../pages/Settings/TransactionHistory';
import MyBookings from '../pages/Settings/MyBookings';
import ProtectedRoute from '../common/ProtectedRoute';

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
            {
                path: "payment-qr/:id",
                element: <QRPaymentPage />,
            },
            {
                path: "payment-success",
                element: <PaymentSuccess />,
            },
            {
                path: "payment-error",
                element: <PaymentError />,
            },
            {
                path: "payment-cancel",
                element: <PaymentCancel />,
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
                element: (
                    <ProtectedRoute>
                        <FavoritesPage/>
                    </ProtectedRoute>
                )
            },
            {
                path: "*",
                element: <NotFoundPage />,
            },    
            {
                path: 'settings',
                element: (
                    <ProtectedRoute>
                        <AccountSettings />
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings/promotion',
                element: (
                    <ProtectedRoute>
                        <SettingPromotion />
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings/bookings',
                element: (
                    <ProtectedRoute>
                        <MyBookings/>
                    </ProtectedRoute>
                )
            },
            {
                path: 'settings/transactions',
                element: (
                    <ProtectedRoute>
                        <TransactionHistory/>
                    </ProtectedRoute>
                )
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
                        <BookingManager />
                    </Auth>
                ),
            },
        ],
    },
]);

export const RouterConfig = () => {
    return <RouterProvider router={router} />;
};
