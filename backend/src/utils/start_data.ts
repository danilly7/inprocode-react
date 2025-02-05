import models from "../models";

const { Event, Competitor, DailyRev } = models;

const insertInitialData = async () => {
  const competitorsData = [
    {
      "name": "La Teca de l'Àvia",
      "address": "C/Degà de Bahí, 5",
      "distance": "-",
      "offers": "Daily menu during weekdays, and rotisserie chicken on Thursdays and weekends. Homemade food.",
      "price": "€",
      "hours": "Open every day except Sundays and Monday afternoons.",
      "color": "bg-yellow-100",
      "latitude": 41.410932953977984, 
      "longitude": 2.1829122818595765
    },
    {
      "name": "El Xamfrà d’en Xifré",
      "address": "C/ Mallorca, 554",
      "distance": "3 minutes",
      "offers": "Rotisserie chicken, roasted potatoes, croquettes, and cannelloni.",
      "price": "€",
      "hours": "Open for lunch service on Thursdays, Fridays, and weekends. Closed on other days.",
      "color": "bg-gray-100",
      "latitude": 41.40927600349386, 
      "longitude": 2.1832211583757934 
    },
    {
      "name": "El Rey del Pollo",
      "address": "C/ Degà de Bahí, 49",
      "distance": "2 minutes",
      "offers": "Daily menu during weekdays. They also make rotisserie chicken and sides.",
      "price": "€",
      "hours": "Open for lunch. Closed on Mondays.",
      "color": "bg-gray-100",
      "latitude": 41.41217196488872, 
      "longitude":  2.1843037791072235
    },
    {
      "name": "La Cuina de la Carme",
      "address": "C/ Muntanya, 47",
      "distance": "3 minutes",
      "offers": "Daily menu during weekdays and roast chicken. They also offer home delivery.",
      "price": "€",
      "hours": "Open until 5 PM. Closed on Tuesdays.",
      "color": "bg-gray-100",
      "latitude": 41.411820126001196, 
      "longitude": 2.1853142251232245
    },
    {
      "name": "El Ruedo restaurant",
      "address": "C/ Rosselló, 540",
      "distance": "4 minutes",
      "offers": "Peruvian restaurant, serves rotisserie chicken.",
      "price": "€€",
      "hours": "Primarily open for dinner service in the evenings. Closed on Tuesdays.",
      "color": "bg-gray-100",
      "latitude": 41.41119763714744, 
      "longitude": 2.1813085284169342
    },
    {
      "name": "Set de Llegums",
      "address": "C/ Rogent, 124",
      "distance": "3 minutes",
      "offers": "Primarily sells all types of legumes. Also offers croquettes, some ready-to-eat dishes, and bulk olives.",
      "price": "€",
      "hours": "Open Monday to Friday until 8:30 PM, and Saturdays until 2:30 PM. Closed on Sundays.",
      "color": "bg-gray-100",
      "latitude": 41.41180659369822, 
      "longitude": 2.1815070088843633
    },
    {
      "name": "Xarcuteries Bosch",
      "address": "C/ València, 558",
      "distance": "2 minutes",
      "offers": "Main activity is a delicatessen. Also offers ready-to-eat dishes and pre-seasoned dishes for cooking.",
      "price": "€€",
      "hours": "Open until late from Monday to Saturday. Closed on Sundays.",
      "color": "bg-gray-100",
      "latitude": 41.40970905265875, 
      "longitude": 2.1832211583757934
    },
    {
      "name": "Casa Tobella",
      "address": "C/ València, 555",
      "distance": "7 minutes",
      "offers": "Gourmet delicatessen. Also offers ready-to-eat dishes.",
      "price": "€€",
      "hours": "Open Monday to Friday. Fridays and Saturdays usually close a bit earlier, but open until 8:30 PM. Closed on Sundays.",
      "color": "bg-gray-100",
      "latitude": 41.40769264284521, 
      "longitude": 2.182571585990707 
    },
  ];

  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await Competitor.bulkCreate(competitorsData, { ignoreDuplicates: true });

  const holidayEventsData = [
    { title: 'Año Nuevo', date: '2025-01-01', color: '#fbc02d' },
    { title: 'Reyes', date: '2025-01-06', color: '#fbc02d' },
    { title: 'Viernes Santo', date: '2025-04-18', color: '#fbc02d' },
    { title: 'Lunes de Pascua', date: '2025-04-21', color: '#fbc02d' },
    { title: 'Fiesta del Trabajo', date: '2025-05-01', color: '#fbc02d' },
    { title: 'Lunes de Pascua', date: '2025-06-09', color: '#fbc02d' },
    { title: 'San Juan', date: '2025-06-24', color: '#fbc02d' },
    { title: 'La Asunción', date: '2025-08-15', color: '#fbc02d' },
    { title: 'Diada Nacional de Cataluña', date: '2025-09-11', color: '#fbc02d' },
    { title: 'Mare de Déu de la Mercè', date: '2025-09-24', color: '#fbc02d' },
    { title: 'Todos los Santos', date: '2025-11-01', color: '#fbc02d' },
    { title: 'Día de la Constitución', date: '2025-12-06', color: '#fbc02d' },
    { title: 'La Inmaculada', date: '2025-12-08', color: '#fbc02d' },
    { title: 'Navidad', date: '2025-12-25', color: '#fbc02d' },
    { title: 'San Esteban', date: '2025-12-26', color: '#fbc02d' },
  ];

  await Event.bulkCreate(holidayEventsData, { ignoreDuplicates: true });

  const dailyRevenueData = [
    { title: 'Daily Revenue - 2024-12-01', date: '2024-12-01', total_sales: 2797.92, total_clients: 163, closed: false, weekday_id: 7, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-02', date: '2024-12-02', total_sales: 0, total_clients: 0, closed: false, weekday_id: 1, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-03', date: '2024-12-03', total_sales: 883.85, total_clients: 58, closed: false, weekday_id: 2, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-04', date: '2024-12-04', total_sales: 441.19, total_clients: 33, closed: true, weekday_id: 3, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-05', date: '2024-12-05', total_sales: 1020.34, total_clients: 87, closed: false, weekday_id: 4, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-06', date: '2024-12-06', total_sales: 1545.22, total_clients: 92, closed: false, weekday_id: 5, bank_holiday: true },
    { title: 'Daily Revenue - 2024-12-07', date: '2024-12-07', total_sales: 1281.45, total_clients: 81, closed: true, weekday_id: 6, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-08', date: '2024-12-08', total_sales: 2731.3, total_clients: 152, closed: false, weekday_id: 7, bank_holiday: true },
    { title: 'Daily Revenue - 2024-12-09', date: '2024-12-09', total_sales: 0, total_clients: 0, closed: false, weekday_id: 1, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-10', date: '2024-12-10', total_sales: 794.17, total_clients: 63, closed: false, weekday_id: 2, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-11', date: '2024-12-11', total_sales: 701.10, total_clients: 46, closed: false, weekday_id: 3, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-12', date: '2024-12-12', total_sales: 713.36, total_clients: 65, closed: false, weekday_id: 4, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-13', date: '2024-12-13', total_sales: 744.04, total_clients: 59, closed: false, weekday_id: 5, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-14', date: '2024-12-14', total_sales: 1562.96, total_clients: 86, closed: true, weekday_id: 6, bank_holiday: false },
    { title: 'Daily Revenue - 2024-12-15', date: '2024-12-15', total_sales: 2255.43, total_clients: 151, closed: false, weekday_id: 7, bank_holiday: false },
  ];

  await DailyRev.bulkCreate(dailyRevenueData, {ignoreDuplicates:true});
}

export { insertInitialData };