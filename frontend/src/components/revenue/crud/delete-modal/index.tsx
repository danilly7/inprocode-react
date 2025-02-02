import React from "react";
import { DailyRevenue } from "../../interface";

interface ModalDeleteProps {
    revenue: DailyRevenue;
    closeModal: () => void;
    onConfirmDelete: (id: number) => void;
}

export const ModalDelete: React.FC<ModalDeleteProps> = ({ revenue, closeModal, onConfirmDelete }) => {
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
                    <h3 className="text-2xl font-semibold">Delete Revenue</h3>
                    <button className="text-xl" onClick={closeModal}>×</button>
                </div>
                <p className="my-4 text-lg">
                    Are you sure you want to delete the revenue for {revenue.title} on {revenue.date}?
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={closeModal}
                    >
                        Close
                    </button>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded"
                        onClick={() => onConfirmDelete(revenue.id_dailyrev)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
