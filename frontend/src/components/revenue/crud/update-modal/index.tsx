import React from "react";

interface ModalUpdateRevenueProps {
    closeModal: () => void;
}

export const ModalUpdateRevenue: React.FC<ModalUpdateRevenueProps> = ({ closeModal }) => {
    const handleClose = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50"
            onClick={handleClose}
        >
            <div className="bg-white rounded-lg shadow-lg p-6 w-80">
                <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-semibold">Revenue Updated</h3>
                    <button className="text-xl" onClick={closeModal}>×</button>
                </div>
                <p className="my-4 text-lg">
                    The revenue has been successfully updated!
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};