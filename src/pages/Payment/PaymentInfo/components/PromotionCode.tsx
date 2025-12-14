import { useEffect, useState } from 'react';
import { Card, Select, Button, notification } from 'antd';
import { promotionAPI, getUser } from '../../../../services/api';

const { Option } = Select;

interface PromotionCodeProps {
  payment?: any;
  onPromotionChange?: (promotion: any) => void;
}

const PromotionCode = ({ onPromotionChange }: PromotionCodeProps) => {
  const [api, contextHolder] = notification.useNotification();
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [applying, setApplying] = useState(false);
  const [localSelectedPromo, setLocalSelectedPromo] = useState<any>(null);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) return;

        const data = await promotionAPI.getByToken(token);
        setPromotions(data.promotion || []);
      } catch (error) {
        console.error('promotions error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPromotions();
  }, []);

  const handleApply = async () => {
    if (!localSelectedPromo) {
      api.warning({
        message: 'Vui lòng chọn mã khuyến mãi',
        placement: 'topRight',
      });
      return;
    }

    try {
      setApplying(true);
      const user = await getUser();
      if (!user) {
        api.error({
          message: 'Vui lòng đăng nhập',
          placement: 'topRight',
        });
        return;
      }

      const result = await promotionAPI.checkUsable(localSelectedPromo.code, user.id);
      
      if (result.usable) {
        onPromotionChange?.(localSelectedPromo);
        api.success({
          message: 'Áp dụng mã thành công',
          description: `Mã ${localSelectedPromo.code} - Giảm ${localSelectedPromo.discount}%`,
          placement: 'topRight',
        });
      }
    } catch (error: any) {
      console.error('Apply promotion error:', error);
      const errorMessage = error?.response?.data?.message || 'Không thể áp dụng mã khuyến mãi';
      api.error({
        message: 'Áp dụng mã thất bại',
        description: errorMessage,
        placement: 'topRight',
      });
      setLocalSelectedPromo(null);
    } finally {
      setApplying(false);
    }
  };

  return (
    <>
      {contextHolder}
      <Card title={<h3 className="text-lg font-bold">Áp mã khuyến mãi</h3>} className="mb-4 shadow-md">
        <div className="flex gap-2">
        <Select
          style={{height: 50}}
          placeholder="Chọn mã khuyến mãi"
          className="flex-1"
          loading={loading}
          value={localSelectedPromo?.id}
          onChange={(value) => {
            const promo = Array.isArray(promotions) ? promotions.find(p => p.id === value) : undefined;
            setLocalSelectedPromo(promo);
          }}
          allowClear
          onClear={() => {
            setLocalSelectedPromo(null);
            onPromotionChange?.(null);
          }}
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
          disabled={!localSelectedPromo}
        >
          Áp dụng
        </Button>
        </div>
      </Card>
    </>
  );
};

export default PromotionCode;