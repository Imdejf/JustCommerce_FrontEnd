import TabsButtons from './TabsButtons';
import TabsProvider from './TabsContext';

interface IBoxComposition {
  Nav: React.FC;
}

const TabsView: React.FC & IBoxComposition = ({ children }) => {
  return <TabsProvider>{children}</TabsProvider>;
};

TabsView.Nav = TabsButtons;

export default TabsView;
