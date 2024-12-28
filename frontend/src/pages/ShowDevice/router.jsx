import { lazy } from 'react';
import LazyWrapper from '@components/LazyLoad';
const Devices = lazy(() => import('./index'));

const RouterPageDevice = {
  path: "/devices",
  element: (
    <LazyWrapper>
      <Devices />
    </LazyWrapper>
  ),
};

export default RouterPageDevice;
