import Navbar from '../navbar/Navbar';

import Bg from '../../assets/images/bg.svg';

type Props = {
  children: JSX.Element;
};

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-grow flex-col md:flex-row relative z-0'>
        <div className='absolute -left-40 lg:left-0 h-screen opacity-30 overflow-hidden pointer-events-none -z-10'>
          <img className='w-full h-full' src={Bg} alt='bg' />
        </div>

        <div className='flex-shrink-0 w-full md:w-56'>
          <Navbar />
        </div>

        <div className='flex flex-col flex-1 md:px-24 md:pl-0 min-w-0 md:pt-30'>
          <div className='flex flex-1 shadow-sm flex-col bg-gradient-to-br  from-gray-ghost to-transparent relative'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
