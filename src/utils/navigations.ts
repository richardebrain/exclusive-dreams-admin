import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  FolderPlusIcon,
  UserGroupIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon, current: true },
  {
    name: "Products", href: "/dashboard/products", icon: FolderPlusIcon, current: false, children: [
      {
        name: "All Products", href: "/dashboard/products", icon: FolderPlusIcon, current: false,
      },
      { name: "Add Product", href: "/dashboard/products/add-new", icon: FolderPlusIcon, current: false, }
    ]
  },
  // 
  { name: "Users", href: "/dashboard/users", icon: UserGroupIcon, current: false },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingCartIcon, current: false },
  //   { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  //   { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
