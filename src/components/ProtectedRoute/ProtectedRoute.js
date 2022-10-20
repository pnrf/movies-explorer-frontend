import { Route, Navigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {() => (props.isLoading ? <Preloader /> : props.isLoggedIn ? <Component {...props} /> : <Navigate to="/" />)}
    </Route>
  );
};

export default ProtectedRoute;
