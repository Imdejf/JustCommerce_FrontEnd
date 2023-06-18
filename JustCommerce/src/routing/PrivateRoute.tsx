import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router';

import { RootState } from '../store/store';

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuth } = useSelector((state: RootState) => state.auth);

  if (isAuth == null) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? children : <Redirect to={{ pathname: '/login', state: { from: location.pathname } }} />
      }
    />
  );
};

export default PrivateRoute;
