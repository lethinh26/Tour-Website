import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const getToken = () => localStorage.getItem('token');

export const getUser = async () => {
    const token = getToken();
    if (!token) return null;
    
    try {
        const res = await axios.post(`${API_BASE_URL}/auth/getUser`, { token });
        
        return res.data;
    } catch (error) {
        console.error('Get user failed:', error);
        return null;
    }
};

export const categoryAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/categories`);
        return { data: res.data };
    },
    
    getById: async (id: number) => {
        const res = await axios.get(`${API_BASE_URL}/categories/${id}`);
        return res.data;
    },
    
    create: async (data: { name: string; description?: string }) => {
        const res = await axios.post(`${API_BASE_URL}/categories`, data);
        return res.data;
    },
    
    update: async (id: number, data: { name?: string; description?: string }) => {
        const res = await axios.patch(`${API_BASE_URL}/categories/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/categories/${id}`);
        return res.data;
    }
};

export const locationAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/locations`);
        return { data: res.data };
    },
    
    getById: async (id: number) => {
        const res = await axios.get(`${API_BASE_URL}/locations/${id}`);
        return res.data;
    },
    
    create: async (data: { name: string }) => {
        const res = await axios.post(`${API_BASE_URL}/locations`, data);
        return res.data;
    },
    
    update: async (id: number, data: { name: string }) => {
        const res = await axios.patch(`${API_BASE_URL}/locations/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/locations/${id}`);
        return res.data;
    }
};

export const tourAPI = {
    getAll: async (userId?: number) => {
        const res = await axios.get(`${API_BASE_URL}/tours`);
        const tours = res.data;
        
        if (userId) {
            return { data: tours.filter((tour: any) => tour.createdBy === userId) };
        }
        
        return tours;
    },

    getPaginated: async (params: {
        page?: number;
        pageSize?: number;
        categoryId?: number;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
        location?: string;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) => {
        const res = await axios.get(`${API_BASE_URL}/tours`, { params });
        return { data: res.data.data, pagination: res.data.pagination };
    },
    
    getById: async (id: number) => {
        const res = await axios.get(`${API_BASE_URL}/tours/${id}`);
        return { data: res.data };
    },
    
    create: async (data: {
        name: string;
        description: string;
        basePrice: number;
        discount?: number;
        categoryId: number;
        information: string;
        address: string;
        locationId: number;
    }) => {
        const res = await axios.post(`${API_BASE_URL}/tours`, data);
        return res.data;
    },
    
    update: async (id: number, data: {
        name?: string;
        description?: string;
        basePrice?: number;
        discount?: number;
        categoryId?: number;
        information?: string;
        address?: string;
        locationId?: number;
    }) => {
        const res = await axios.patch(`${API_BASE_URL}/tours/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/tours/${id}`);
        return res.data;
    },

    count: async () => {
        const res = await axios.get(`${API_BASE_URL}/tours/count`);
        return res.data;
    }
};

export const tourImageAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/tourImages/all`);
        return { data: res.data };
    },
    
    getByTourId: async (tourId: number) => {
        const res = await axios.get(`${API_BASE_URL}/tourImages/${tourId}`);
        return { data: res.data };
    },
    
    create: async (data: { url: string; position: number; tourId: number }) => {
        const res = await axios.post(`${API_BASE_URL}/tourImages`, data);
        return res.data;
    },
    
    update: async (id: number, data: { url?: string; position?: number }) => {
        const res = await axios.patch(`${API_BASE_URL}/tourImages/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/tourImages/${id}`);
        return res.data;
    }
};

export const tourDepartureAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/tourDepartures`);
        return { data: res.data };
    },
    
    getByTourId: async (tourId: number) => {
        const res = await axios.get(`${API_BASE_URL}/tourDepartures/tour/${tourId}`);
        return { data: res.data };
    },
    
    create: async (data: {
        departure: string;
        price: number;
        capacity: number;
        availableSeats: number;
        tourId: number;
    }) => {
        const res = await axios.post(`${API_BASE_URL}/tourDepartures`, data);
        return res.data;
    },
    
    update: async (id: number, data: {
        departure?: string;
        price?: number;
        capacity?: number;
        availableSeats?: number;
    }) => {
        const res = await axios.patch(`${API_BASE_URL}/tourDepartures/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/tourDepartures/${id}`);
        console.log(res);
        
        return { data: res.data };
    },

    deleteByTourId: async (tourId: number) => {
        const res = await axios.delete(`${API_BASE_URL}/tourDepartures/tour/${tourId}`);
        return { data: res.data };
    }
};

export const promotionAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/promotions`);
        return { data: res.data };
    },
    
    getAvailableForUser: async (userId: number) => {
        const res = await axios.get(`${API_BASE_URL}/promotions/${userId}`);
        return res.data;
    },

    getByToken: async (token: string) => {
        const res = await axios.get(`${API_BASE_URL}/promotions/token/${token}`);
        return { data: res.data };
    },

    addToUser: async (token: string, promotionId: number) => {
        const res = await axios.post(`${API_BASE_URL}/promotions/token`, { token, promotionId });
        return { data: res.data, status: res.status };
    },

    checkUsable: async (code: string, userId: number) => {
        const res = await axios.post(`${API_BASE_URL}/promotions/check-usable`, { code, userId });
        return res.data;
    },

    use: async (code: string, userId: number) => {
        const res = await axios.post(`${API_BASE_URL}/promotions/use`, { code, userId });
        return res.data;
    },
    
    create: async (data: {
        discount: number;
        amount: number;
        code: string;
        type: 'NEW' | 'ALL';
        name: string;
        description: string;
        startAt: string;
        endAt?: string;
    }) => {
        const res = await axios.post(`${API_BASE_URL}/promotions`, data);
        return res.data;
    },
    
    update: async (id: number, data: {
        discount?: number;
        amount?: number;
        code?: string;
        type?: 'NEW' | 'ALL';
        name?: string;
        description?: string;
        startAt?: string;
        endAt?: string;
    }) => {
        console.log(data.description);
        
        const res = await axios.patch(`${API_BASE_URL}/promotions/${id}`, data);
        return res.data;
    },
    
    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/promotions/${id}`);
        return res.data;
    }
};

export const dashboardAPI = {
    getStats: async (userId?: number) => {
        try {
            const [tours, categories, locations] = await Promise.all([
                tourAPI.getAll(userId),
                categoryAPI.getAll(),
                locationAPI.getAll()
            ]);
            
            return {
                totalTours: Array.isArray(tours.data) ? tours.data.length : 0,
                totalCategories: Array.isArray(categories.data) ? categories.data.length : 0,
                totalLocations: Array.isArray(locations.data) ? locations.data.length : 0
            };
        } catch (error) {
            console.error('Get stats failed:', error);
            throw error;
        }
    },
    
    getRevenueData: async () => {
        try {
            return {
                monthly: {
                    2024: [120000000, 150000000, 180000000, 200000000, 220000000, 250000000, 280000000, 260000000, 240000000, 300000000, 320000000, 350000000],
                    2025: [160000000, 180000000, 210000000, 240000000, 270000000, 300000000, 320000000, 310000000, 290000000, 340000000, 360000000, 380000000]
                },
                quarterly: {
                    2024: [450000000, 670000000, 780000000, 970000000],
                    2025: [550000000, 810000000, 920000000, 1080000000]
                }
            };
        } catch (error) {
            console.error('Get revenue data failed:', error);
            throw error;
        }
    },
    
    getTopTours: async (userId?: number) => {
        try {
            const allTours = [
                {
                    key: '1',
                    rank: 1,
                    tourName: 'Du lịch Hạ Long - Ninh Bình 3N2Đ',
                    location: 'Quảng Ninh',
                    bookings: 156,
                    revenue: 780000000,
                    trend: 'up' as const,
                    createdBy: 1
                },
                {
                    key: '2',
                    rank: 2,
                    tourName: 'Phú Quốc - Đảo Ngọc 4N3Đ',
                    location: 'Kiên Giang',
                    bookings: 142,
                    revenue: 710000000,
                    trend: 'up' as const,
                    createdBy: 2
                },
                {
                    key: '3',
                    rank: 3,
                    tourName: 'Đà Nẵng - Hội An - Huế 5N4Đ',
                    location: 'Đà Nẵng',
                    bookings: 128,
                    revenue: 640000000,
                    trend: 'stable' as const,
                    createdBy: 1
                }
            ];
            
            if (userId) {
                return allTours.filter(tour => tour.createdBy === userId);
            }
            
            return allTours;
        } catch (error) {
            console.error('Get top tours failed:', error);
            throw error;
        }
    }
};

export const bookingAPI = {
    countCustomers: async () => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/countCustomers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    countAllCustomers: async () => {
        const res = await axios.get(`${API_BASE_URL}/bookings/countAllCustomers`);
        return res.data;
    },

    countBookingSuccess: async () => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/countBookingSuccess`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    countAllBookingsSuccess: async () => {
        const res = await axios.get(`${API_BASE_URL}/bookings/countAllBookingsSuccess`);
        return res.data;
    },

    monthlyRevenue: async (month: number, year?: number) => {
        const token = getToken();
        const params: any = { month };
        if (year) params.year = year;
        
        const res = await axios.get(`${API_BASE_URL}/bookings/monthlyRevenue`, {
            headers: { Authorization: `Bearer ${token}` },
            params
        });
        return res.data;
    },

    monthlyRevenueAll: async (month: number, year?: number) => {
        const params: any = { month };
        if (year) params.year = year;
        
        const res = await axios.get(`${API_BASE_URL}/bookings/monthlyRevenueAll`, {
            params
        });
        return res.data;
    },

    topTourAll: async (limit: number = 10) => {
        const res = await axios.get(`${API_BASE_URL}/bookings/topTourAll`, {
            params: { limit }
        });
        return res.data;
    },

    topTour: async (limit: number = 10) => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/topTour`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit }
        });
        return res.data;
    },

    countTours: async (token: string) => {
        const res = await axios.get(`${API_BASE_URL}/tours/count`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    countToursAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/tours/count/all`);
        console.log(res);
        
        return res.data;
    }
};

export const orderAPI = {
    create: async (data: {
        userId: number;
        items: { quantity: number; unitPrice: number; tourDepartureId: number }[];
        totalAmount: number;
        status: 'PENDING' | 'PAID' | 'CANCELLED';
    }) => {
        const res = await axios.post(`${API_BASE_URL}/payments/order`, data);
        return res.data;
    },
    
    getById: async (id: number) => {
        const res = await axios.get(`${API_BASE_URL}/payments/order/${id}`);
        return res.data;
    },

    getByDepartureId: async (departureId: number) => {
        const res = await axios.get(`${API_BASE_URL}/orders/departure/${departureId}`);
        return { data: res.data };
    }
};

export const orderItemAPI = {
    create: async (data: {
        orderId: number;
        quantity: number;
        unitPrice: number;
        tourDepartureId: number;
    }) => {
        const res = await axios.post(`${API_BASE_URL}/payments/order-item`, data);
        return res.data;
    }
};

export const paymentAPI = {
    create: async (data: {
        orderId: number;
        userId: number;
        amount: number;
        method: 'CASH' | 'BANK_TRANSFER';
        status: 'PENDING' | 'SUCCESS' | 'FAILED';
    }) => {
        const res = await axios.post(`${API_BASE_URL}/payments`, data);
        return res.data;
    },
    
    getById: async (id: string) => {
        const res = await axios.get(`${API_BASE_URL}/payments/${id}`);
        return res.data;
    },
    
    update: async (id: string, data: {
        amount?: number;
        method?: 'CASH' | 'BANK_TRANSFER';
        status?: 'PENDING' | 'SUCCESS' | 'FAILED';
    }) => {
        const res = await axios.patch(`${API_BASE_URL}/payments/${id}`, data);
        return res.data;
    },
    
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/payments`);
        return res.data;
    },

    getAllOrders: async () => {
        const res = await axios.get(`${API_BASE_URL}/payments/orders/all`);
        return res.data;
    },

    getOrderReview: async (orderId: number, userId: number) => {
        const res = await axios.get(`${API_BASE_URL}/tours/reviews/order/${orderId}/user/${userId}`);
        return res.data;
    }
};

export const reviewAPI = {
    getAll: async () => {
        const res = await axios.get(`${API_BASE_URL}/tours/reviews`);
        console.log("bro idk",res);
        
        return { data: res.data };
    },

    getByTourId: async (tourId: number) => {
        const res = await axios.get(`${API_BASE_URL}/tours/reviews/tour/${tourId}`);
        return { data: res.data };
    },

    create: async (data: {
        tourId: number;
        userId: number;
        orderId: number;
        rating: number;
        comment?: string;
    }) => {
        const res = await axios.post(`${API_BASE_URL}/tours/reviews`, data);
        return res.data;
    },

    delete: async (id: number) => {
        const res = await axios.delete(`${API_BASE_URL}/tours/reviews/${id}`);
        return res.data;
    }
};

export const favoriteTourAPI = {
    getByToken: async (token: string) => {
        const res = await axios.get(`${API_BASE_URL}/favoriteTours/${token}`);
        return { data: res.data };
    },

    add: async (token: string, tourId: number) => {
        const res = await axios.post(`${API_BASE_URL}/favoriteTours`, { token, tourId });
        return { data: res.data };
    },

    remove: async (token: string, tourId: number) => {
        const res = await axios.delete(`${API_BASE_URL}/favoriteTours`, { data: { token, tourId } });
        return { data: res.data };
    }
};

export const authAPI = {
    getUser: async (token: string) => {
        const res = await axios.post(`${API_BASE_URL}/auth/getUser`, { token });
        return { data: res.data };
    },

    updateInfo: async (data: { token: string; name: string; phoneNumber: string }) => {
        const res = await axios.patch(`${API_BASE_URL}/auth/updateInfo`, data);
        return res.data;
    },

    changePassword: async (data: { token: string; oldPassword: string; newPassword: string }) => {
        const res = await axios.patch(`${API_BASE_URL}/auth/changepass`, data);
        return res.data;
    },

    deleteAccount: async (token: string) => {
        const res = await axios.delete(`${API_BASE_URL}/auth/deleteAccount`, { data: { token } });
        return res.data;
    }
};
