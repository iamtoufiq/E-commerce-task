import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const PageLoader: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    setTimeout(() => NProgress.done(), 500);

    return () => {
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default PageLoader;