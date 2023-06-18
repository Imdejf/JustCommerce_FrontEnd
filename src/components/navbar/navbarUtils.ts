import { INavbarItem } from "./navbarTypes";

import { ReactComponent as ArtistIco } from "assets/icons/artistIco.svg";
import { ReactComponent as HomeIco } from "assets/icons/homeIco.svg";
import { ReactComponent as ContactIco } from "assets/icons/contactIco.svg";
import { ReactComponent as LicensorIco } from "assets/icons/licensorIco.svg";
import { ReactComponent as FilesIco } from "assets/icons/filesIco.svg";
import { ReactComponent as ManagmentIco } from "assets/icons/managmentIco.svg";
import { ReactComponent as NotificationIco } from "assets/icons/notificationIco.svg";
import { ReactComponent as ProductIco } from "assets/icons/productIco.svg";
import { ReactComponent as SalesChannelIco } from "assets/icons/salesChannelIco.svg";
import { ReactComponent as TrackIco } from "assets/icons/trackIco.svg";

export const navLinks: Array<INavbarItem> = [
  {
    label: "Dashboard",
    icon: HomeIco,
    path: "/",
  },
  {
    label: "Site",
    icon: ArtistIco,
    items: [
      {
        label: 'Vendors',
        icon: LicensorIco,
        path: '/site/users',
      },
      {
        label: 'Vendors',
        icon: LicensorIco,
        path: '/site/Vendors',
      },
      {
        label: 'Customer Groups',
        icon: LicensorIco,
        path: '/site/customergroups',
      },
      {
        label: 'Reviews',
        icon: LicensorIco,
        path: '/site/reviews',
      },
      {
        label: 'Comments',
        icon: LicensorIco,
        path: '/site/comments',
      },
      {
        label: 'Manage contact area',
        icon: LicensorIco,
        path: '/site/contactarea',
      },
      {
        label: 'Blog',
        icon: LicensorIco,
        path: '/site/blog',
      },
    ],
  },
  {
    label: "Catalog",
    icon: SalesChannelIco,
    // path: "/player-profiles",
    items: [
      {
        label: 'Products',
        icon: LicensorIco,
        path: '/catalog/product',
      },
      {
        label: 'Products Price',
        icon: LicensorIco,
        path: '/catalog/product-price',
      },
      {
        label: 'Categories',
        icon: LicensorIco,
        path: '/catalog/category',
      },
      {
        label: 'Product Options',
        icon: LicensorIco,
        path: '/catalog/product-option',
      },
      {
        label: 'Product Attribute Groups',
        icon: LicensorIco,
        path: '/catalog/product-attribute-group',
      },
      {
        label: 'Product Attribute',
        icon: LicensorIco,
        path: '/catalog/product-attribute',
      },
      {
        label: 'Product Templates',
        icon: LicensorIco,
        path: '/catalog/product-template',
      },
    ]
  },
  {
    label: "Sales",
    icon: SalesChannelIco,
    // path: "/trainer-profiles",
    items: [
      {
        label: 'Order',
        icon: LicensorIco,
        path: '/sales/order',
      },
      {
        label: 'Shipments',
        icon: LicensorIco,
        path: '/sales/shipments',
      },
    ]
  },

  {
    label: "Promotions",
    icon: HomeIco,
    // path: "/academies",
    items:[
      {
        label: 'Cart Price Rule',
        icon: LicensorIco,
        path: '/promotions/cart-rules',
      },
      {
        label: 'Cart Price Rule Usages',
        icon: LicensorIco,
        path: '/promotions/cart-rule-usage',
      },
    ]
  },

  {
    label: "System",
    icon: ProductIco,
    items: [
      {
        label: "Countries",
        path: "/system/countries",
      },
      {
        label: "State or Province",
        path: "/system/stateprovince",
      },
      {
        label: "Tax Classes",
        path: "/system/taxclasses",
      },
      {
        label: "Tax Rates",
        path: "/system/taxrates",
      },
      {
        label: "Shipping providers",
        path: "/system/shippingproviders",
      },
      {
        label: "Payment providers",
        path: "/system/paymentproviders",
      },
      {
        label: "Settings",
        path: "/system/configuration",
      },
      {
        label: "Settings",
        path: "/system/configuration",
      },
    ],
  },
  // {
  //   label: "Utwory",
  //   icon: TrackIco,
  //   path: "/tracks",
  // },
  // {
  //   label: "Produkty",
  //   icon: ProductIco,
  //   path: "/digitalReleases",
  // },
  // {
  //   label: "Licencjonodawcy",
  //   icon: LicensorIco,
  //   path: "/licensors",
  // },
  // {
  //   label: "Dostawcy",
  //   icon: LicensorIco,
  //   path: "/providers",
  // },
  // {
  //   label: "System rozliczeń",
  //   icon: SalesChannelIco,
  //   items: [
  //     {
  //       label: "Kanały sprzedaży",
  //       path: "/settlements/salesChannel",
  //     },
  //     {
  //       label: "Warunki",
  //       path: "/settlements/conditions",
  //     },
  //   ],
  // },
  // {
  //   label: "Powiadomienia",
  //   icon: NotificationIco,
  //   path: "/",
  // },
  {
    label: "Kontakty",
    icon: ContactIco,
    path: "/contacts",
  },
  {
    label: "Zarządzanie",
    icon: ManagmentIco,
    path: "/users",
  },
  {
    label: "Pliki wewnętrzne",
    icon: FilesIco,
    path: "/files",
  },
];
