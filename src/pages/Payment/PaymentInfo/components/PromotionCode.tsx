import React, { useEffect, useState } from 'react';
import { Card, Select, Button, message } from 'antd';
import { promotionAPI, getUser } from '../../../../services/api';

const { Option } = Select;

interface PromotionCodeProps {
  payment?: any;
  selectedPromotion?: any;
  onPromotionChange?: (promotion: any) => void;
}

const PromotionCode = ({ payment, selectedPromotion, onPromotionChange }: PromotionCodeProps) => {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        const data = await promotionAPI.getByToken(token);
        setPromotions(data.promotion || []);
      } catch (error) {
        console.error('Fetch promotions error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleApply = async () => {
    if (!selectedPromotion) {
      message.warning('Vui lòng chọn mã khuyến mãi');
      return;
    }

    try {
      setApplying(true);
      const user = await getUser();
      if (!user) {
        message.error('Vui lòng đăng nhập');
        return;
      }

      const result = await promotionAPI.checkUsable(selectedPromotion.code, user.id);
      
      if (result.usable) {
        message.success(`Áp dụng mã ${selectedPromotion.code} thành công! Giảm ${selectedPromotion.discount}%`);
      }
    } catch (error: any) {
      console.error('Apply promotion error:', error);
      message.error(error?.response?.data?.message || 'Không thể áp dụng mã giảm giá');
      onPromotionChange?.(null);
    } finally {
      setApplying(false);
    }
  };

  return (
    <Card title={<h3 className="text-lg font-bold">Áp mã khuyến mãi</h3>} className="mb-4 shadow-md">
      <div className="flex gap-2">
        <Select
          style={{height: 50}}
          placeholder="Chọn mã khuyến mãi"
          className="flex-1"
          loading={loading}
          value={selectedPromotion?.id}
          onChange={(value) => {
            const promo = Array.isArray(promotions) ? promotions.find(p => p.id === value) : undefined;
            onPromotionChange?.(promo);
          }}
          allowClear
          onClear={() => onPromotionChange?.(null)}
        >
          {Array.isArray(promotions) && promotions.map((promo) => (
            <Option key={promo.id} value={promo.id}>
              <div className="flex justify-between items-center">
                <span className="font-semibold">{promo.code}</span>
                <span className="text-orange-500">-{promo.discount}%</span>
              </div>
              <div className="text-xs text-gray-500">{promo.name}</div>
            </Option>
          ))}
        </Select>
        <Button 
          type="primary" 
          onClick={handleApply}
          loading={applying}
          disabled={!selectedPromotion}
        >
          Áp dụng
        </Button>
      </div>
    </Card>
  );
};

export default PromotionCode;