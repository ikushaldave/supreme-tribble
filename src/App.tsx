import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@components/Loader';
import NoAuthLayout from '@/pages/noAuth/layout';
import Login from '@/pages/noAuth/login';
import AppLayout from '@pages/app/layout';
import Home from '@pages/app/home';
import NoPageFound from '@pages/noPageFound';

const App = () => {
  return (
    <>
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
      <Loader />
    </>
  );
};

export default App;
