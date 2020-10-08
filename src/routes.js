
import LoginComponent from "./components/LoginComponent";
import DashboardComponent from "./components/DashboardComponent";

export default [
    {
        path: '/', name: 'login', component: LoginComponent
    },
    {
        path: '/dashboard', name: 'dashboard', component: DashboardComponent
    }
]
