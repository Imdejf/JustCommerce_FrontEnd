import React from 'react';
import { useTabs } from './TabsContext';

interface Props {
  id: string;
}

const TabContent: React.FC<Props> = ({ children, id }) => {
  const { activeTab } = useTabs();

  if (activeTab !== id) {
    return null;
  }

  return <>{children}</>;
};

export default TabContent;
