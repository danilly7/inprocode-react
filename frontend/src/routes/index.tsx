import { lazy } from "react";
import { RouteObject } from 'react-router-dom';

const Home = lazy(() => import('../pages/home'));
const Calendar = lazy(() => import('../pages/calendar-bank-holidays'));
const Graphics = lazy(() => import('../pages/graphics-revenue'));
const Map = lazy(() => import('../pages/map-competitors'));
const Revenue = lazy(() => import('../pages/overview-revenue'));
const RevenueLayout = lazy(() => import('../layouts/revenue-layout'));
const CompetitorsLayout = lazy(() => import('../layouts/competitors-layout'));
const CalendarLayout = lazy(() => import('../layouts/calendar-layout'));
const ErrorPage = lazy(() => import('../pages/error')); 

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/revenue',
    element: <RevenueLayout />,
    children: [
      {
        path: 'overview',
        element: <Revenue />,
      },
      {
        path: 'graphics',
        element: <Graphics />,
      },
    ],
  },
  {
    path: '/calendar',
    element: <CalendarLayout />,
    children: [
      {
        path: '',
        element: <Calendar />,
      },
    ],
  },
  {
    path: '/map',
    element: <CompetitorsLayout />,
    children: [
      {
        path: '',
        element: <Map />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
];