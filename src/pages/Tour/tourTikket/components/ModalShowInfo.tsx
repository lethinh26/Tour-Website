import { Modal } from "antd";
import { useState } from "react";

export default function ModalShowInfo({prop} : { prop: string }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const htmlObjectInfomation = { __html: prop || "" };

    return (
        <div>
            <button
                type="button"
                className="mt-4 w-full rounded-lg border border-sky-500 bg-white px-4 py-2 text-sky-600 font-medium hover:bg-sky-50"
                onClick={showModal}
            >
                Xem Thông tin vé
            </button>
            {/* <Button type="primary" onClick={showModal}>
                Open Modal
            </Button> */}
            <Modal
                title="Basic Modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                className="w-200!"
            >
                <div dangerouslySetInnerHTML={htmlObjectInfomation}></div>
            </Modal>
        </div>
    )
}
