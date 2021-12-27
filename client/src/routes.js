import MainPage from "./pages/mainPage/mainPage"
import Auth from "./pages/Auth"
import StartPage from "./pages/StartPage"
import {
    MAIN_ROUTE,
    LOGIN_ROUTE,
    START_ROUTE,
    CLOCK_ROUTE,
    CALENDAR_ROUTE,
    USER_ROUTE,
    SETTINGS_ROUTE
} from "./utils/consts"
import ClockPage from "./pages/ClockPage"
import Calendar from "./pages/Calendar"
import UserPage from "./pages/UserPage"
import SettingsPage from "./pages/Settings";

export const authRoutes = [
    {
        path: MAIN_ROUTE,
        Component: <MainPage/>
    },
    {
        path: CLOCK_ROUTE,
        Component: <ClockPage/>
    },
    {
        path: CALENDAR_ROUTE,
        Component: <Calendar/>
    },
    {
        path: USER_ROUTE,
        Component: <UserPage/>
    },
    {
        path: SETTINGS_ROUTE,
        Component: <SettingsPage/>
    },
]

export const publicRoutes = [
    {
        path: START_ROUTE,
        Component: <StartPage/>
    },
    {
        path: LOGIN_ROUTE,
        Component: <Auth/>
    },

]