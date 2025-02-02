import { useState } from "react";
import { AddRevenueForm } from "../../components/revenue/crud/create-form";
import { ListRevenue } from "../../components/revenue/crud/read-list";
import { UpdateRevenueForm } from "../../components/revenue/crud/update-form";
import { DailyRevenue } from "../../components/revenue/interface";

export const Revenue = () => {
    const [selectedRevenueForUpdate, setSelectedRevenueForUpdate] = useState<DailyRevenue | null>(null);

    const handleOpenUpdateForm = (revenue: DailyRevenue) => {
        setSelectedRevenueForUpdate(revenue);
    };

    const handleCloseUpdateForm = () => {
        setSelectedRevenueForUpdate(null);
    };

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-4">Revenue Overview</h1>
            <ListRevenue onEdit={handleOpenUpdateForm} />
            
            {selectedRevenueForUpdate ? (
                <UpdateRevenueForm
                    revenue={selectedRevenueForUpdate}
                    onClose={handleCloseUpdateForm}
                />
            ) : (
                <AddRevenueForm />
            )}
        </div>
    );
};