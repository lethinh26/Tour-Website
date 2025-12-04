import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const FullPageLoader = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 200 }} spin />} />
        </div>
    );
};

export default FullPageLoader;