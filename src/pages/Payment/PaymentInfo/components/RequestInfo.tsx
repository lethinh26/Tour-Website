
import { Card, Form, Input } from 'antd';

const RequestInfo = () => {
  return (
    <Card title={<h3 className="text-lg font-bold">Yêu cầu thêm (tùy chọn)</h3>} className="mb-4 shadow-md">
      <Form layout="vertical">
        <Form.Item label="Yêu cầu">
          <Input.TextArea placeholder="Nhập yêu cầu thêm" rows={4} className="rounded-md" />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RequestInfo;