import axios from 'axios';

const API_BASE_URL = 'http://160.191.236.178:3000/api';

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
        
        return { data: tours };
    },
    
    getById: async (id: number) => {
        const res = await axios.get(`${API_BASE_URL}/tours/${id}`);
        return res.data;
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
        return res.data;
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
        return res.data;
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
    // Tour Manager: Đếm khách hàng của tour do mình tạo
    countCustomers: async () => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/countCustomers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    // Admin only: Đếm tất cả khách hàng hệ thống
    countAllCustomers: async () => {
        const res = await axios.get(`${API_BASE_URL}/bookings/countAllCustomers`);
        return res.data;
    },

    // Tour Manager: Đếm booking thành công của tour do mình tạo
    countBookingSuccess: async () => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/countBookingSuccess`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return res.data;
    },

    // Admin only: Đếm tất cả booking thành công
    countAllBookingsSuccess: async () => {
        const res = await axios.get(`${API_BASE_URL}/bookings/countAllBookingsSuccess`);
        return res.data;
    },

    // Tour Manager: Doanh thu theo tháng của tour do mình tạo
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

    // Admin only: Doanh thu theo tháng toàn hệ thống
    monthlyRevenueAll: async (month: number, year?: number) => {
        const params: any = { month };
        if (year) params.year = year;
        
        const res = await axios.get(`${API_BASE_URL}/bookings/monthlyRevenueAll`, {
            params
        });
        return res.data;
    },

    // Admin only: Top tour phổ biến nhất toàn hệ thống
    topTourAll: async (limit: number = 10) => {
        const res = await axios.get(`${API_BASE_URL}/bookings/topTourAll`, {
            params: { limit }
        });
        return res.data;
    },

    // Tour Manager: Top tour phổ biến của tour do mình tạo
    topTour: async (limit: number = 10) => {
        const token = getToken();
        const res = await axios.get(`${API_BASE_URL}/bookings/topTour`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { limit }
        });
        return res.data;
    },

    // Đếm tổng số tour
    countTours: async () => {
        const res = await axios.get(`${API_BASE_URL}/tours`);
        return { count: res.data.length };
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
    }
};
