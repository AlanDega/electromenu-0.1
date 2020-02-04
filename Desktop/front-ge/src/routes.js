import Login from "views/Login.jsx";
import Restaurants from "views/Restaurants.jsx";
import Promociones from "views/Promociones.jsx";
import Category from "views/Category.jsx";
import Food from "./views/Food";
import Orders from "./views/Orders";
import Configuration from "./views/Configuration";
import Users from "./views/Users";
import ResetPassword from "./views/ForgotPassword";
import Riders from "./views/Riders";
import Options from "./views/Options";
import Addons from "./views/Addons";
import Inventarios from "./views/Inventarios";
import Dashboard from "./views/Dashboard";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/restaurants",
    name: "Restaurantes",
    icon: "ni ni-chart-pie-35 text-red",
    component: Restaurants,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/category",
    name: "Category",
    icon: "ni ni-chart-pie-35 text-red",
    component: Category,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/promociones",
    name: "Promociones",
    icon: "ni ni-chart-pie-35 text-red",
    component: Promociones,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/food",
    name: "Food",
    icon: "ni ni-tie-bow text-green",
    component: Food,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-delivery-fast text-orange",
    component: Orders,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-black",
    component: Users,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/riders",
    name: "Riders",
    icon: "ni ni-single-02 text-black",
    component: Riders,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/configuration",
    name: "Configuration",
    icon: "ni ni-settings-gear-65 text-black",
    component: Configuration,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/option",
    name: "Option",
    icon: "ni ni-settings-gear-65 text-black",
    component: Options,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/addons",
    name: "Addons",
    icon: "ni ni-settings-gear-65 text-black",
    component: Addons,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/inventarios",
    name: "Inventarios",
    icon: "ni ni-settings-gear-65 text-black",
    component: Inventarios,
    layout: "/admin",
    appearInSidebar: true
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    appearInSidebar: false
  },
  {
    path: "/reset",
    name: "ResetPassword",
    icon: "ni ni-key-25 text-info",
    component: ResetPassword,
    layout: "/auth",
    appearInSidebar: false
  },
];
export default routes;
