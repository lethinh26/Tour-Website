import React from 'react';
import { Card, Form, Input } from 'antd';

const PromotionCode = () => {
  return (
    <Card title={<h3 className="text-lg font-bold">Áp mã khuyến mãi</h3>} className="mb-4 shadow-md">
      <Form layout="vertical">
        <Form.Item label="Mã khuyến mãi">
          <Input placeholder="Nhập mã khuyến mãi" className="rounded-md" />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default PromotionCode;