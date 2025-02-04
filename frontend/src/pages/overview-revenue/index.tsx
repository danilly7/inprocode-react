import { useState } from "react";
import { AddRevenueForm } from "../../components/revenue/crud/create-form";
import { ListRevenue } from "../../components/revenue/crud/read-list";
import { UpdateRevenueForm } from "../../components/revenue/crud/update-form";
import { DailyRevenue } from "../../components/revenue/interface";
import { useRevenueContext } from "../../context/revenue-context";
import { ModalDelete } from "../../components/revenue/crud/delete-modal";

const Revenue = () => {
    const [selectedRevenueForUpdate, setSelectedRevenueForUpdate] = useState<DailyRevenue | null>(null);
    const { createRevenue, updateRevenue, deleteRevenue, refreshRevenue } = useRevenueContext();
    const [selectedRevenueForDelete, setSelectedRevenueForDelete] = useState<DailyRevenue | null>(null);

    //----Funciones delegadas al padre pq sino no se entera de lo que hacen sus hijos----↓
    //READ
    const handleOpenUpdateForm = (revenue: DailyRevenue) => {
        setSelectedRevenueForUpdate(revenue);
    };

    //CREATE -- ojo esto es optimistic ui
    const handleCreateRevenue = async (newRevenue: Omit<DailyRevenue, "id_dailyrev">) => {
        try {
            await createRevenue(newRevenue);
        } catch (error) {
            console.error("Error creating revenue:", error);
        }
    };

    //UPDATE -- tmb optimistic ui
    const handleUpdateRevenue = async (id: number, updatedRevenue: Omit<DailyRevenue, "id_dailyrev">) => {
        try {
            await updateRevenue(id, updatedRevenue);
        } catch (error) {
            console.error("Error updating revenue:", error);
        }
    };

    //DELETE
    const handleCloseDeleteModal = () => {
        setSelectedRevenueForDelete(null);
    };

    const handleConfirmDelete = (id: number) => {
        deleteRevenue(id).then(() => {
            refreshRevenue();
            handleCloseDeleteModal();
        });
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Revenue Overview through Numbers</h1>
            <ListRevenue
                onEdit={handleOpenUpdateForm}
            />

            {selectedRevenueForUpdate ? (
                <UpdateRevenueForm
                    revenue={selectedRevenueForUpdate}
                    onSubmit={handleUpdateRevenue}
                    onClose={() => setSelectedRevenueForUpdate(null)} 
                />
            ) : (
                <AddRevenueForm
                    onSuccess={handleCreateRevenue}
                />
            )}

            {selectedRevenueForDelete && (
                <ModalDelete
                    revenue={selectedRevenueForDelete}
                    closeModal={handleCloseDeleteModal}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default Revenue;