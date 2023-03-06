import React from 'react';

type IconType = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
  }
>;

export interface INavbarLink {
  icon?: IconType;
  label: string;
  path: string;
}

export interface INavbarItem {
  icon: IconType;
  label: string;
  items?: Array<INavbarLink>;
  path?: string;
}

export interface INavbarItemListProps {
  isExpanded: boolean;
}
