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
  { name: "Dashboard", href: "/", icon: HomeIcon, current: true },
  {
    name: "Products", href: "/products", icon: FolderPlusIcon, current: false, children: [
      {
        name: "All Products", href: "/products", icon: FolderPlusIcon, current: false,
      },
      { name: "Add Product", href: "/products/add-new", icon: FolderPlusIcon, current: false, }
    ]
  },
  // 
  { name: "Users", href: "/users", icon: UserGroupIcon, current: false },
  { name: "Orders", href: "/orders", icon: ShoppingCartIcon, current: false },
  //   { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  //   { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
export const uis = [
  { id: 1, name: "Carousel", href: "/carousel", initial: "C", current: false },
  // { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  // { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];
