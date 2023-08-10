/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@components/Loader';
import { Toaster } from '@components/toaster';
import ErrorBoundary from '@components/error-boundary';
import NoAuthLayout from '@/pages/noAuth/layout';
import Login from '@/pages/noAuth/login';
import AppLayout from '@pages/app/layout';
import Home from '@pages/app/home';
import NoPageFound from '@pages/noPageFound';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { useToast } from './hooks/use-toast';
import { setToastInfo } from './reducer/commonSlice';

const App = () => {
  const toastInfo = useSelector((state: RootState) => state.common.toastInfo);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const timerIdRef = useRef<any>();

  useEffect(() => {
    if (toastInfo) {
      toast({
        title: toastInfo.title,
        description: toastInfo.description,
        variant: toastInfo.variant
      });

      timerIdRef.current = setTimeout(() => {
        dispatch(setToastInfo(null));
      }, 3000);
    }

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, [toastInfo]);

  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/app" element={<Home />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="*" element={<NoPageFound />} />
      </Routes>
      <Toaster />
      <Loader />
    </ErrorBoundary>
  );
};

export default App;
