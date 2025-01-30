export interface DailyRevenue {
    id_dailyrev: number;
    title: string;
    date: string;
    closed: boolean;
    weekday_id: number;
    bank_holiday: boolean;
    total_sales: number;
    total_clients: number;
}