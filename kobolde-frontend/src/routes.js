import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import AddCategory from "views/AddCategory";
import TableList from "views/TableList.js";
import Report from "views/ProductsReport";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "Användar Profil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Kategori",
    icon: "nc-icon nc-notes",
    component: AddCategory,
    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Produkt",
    icon: "nc-icon nc-atom",
    component: TableList,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "List",
    icon: "nc-icon nc-paper-2",
    component: Report,
    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
  },
];

export default dashboardRoutes;
