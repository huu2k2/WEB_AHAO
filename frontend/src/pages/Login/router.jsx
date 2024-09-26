import { lazy } from 'react';
import LazyWrapper from '@components/LazyLoad';
const Page_Login = lazy(() => import('./index'));

const RouterPageLogin = {
  path: "/login",
  element: (
    <LazyWrapper>
      <Page_Login />
    </LazyWrapper>
  ),
};

export default RouterPageLogin;
