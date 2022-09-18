import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useEffect(() => {
  //     console.log('scroll to component', pathname);
  //     if(pathname === '/leaderboard'){
  //         if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  //             window.scrollTo(0, 1100);
  //         }
  //     }
  // }, [pathname]);

  

  return null;
}