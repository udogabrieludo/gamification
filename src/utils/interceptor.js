import axios from "axios";



const Interceptor =  (token) => {
  
  //setup interceptors for 401 errors
  axios.interceptors.response.use(
    (response) => {
     
     
      return response;
    },
    (error) => {
      //check the response status
      if (error.response && error.response.status === 401) {
        
        const currentURL = window.location.pathname
        
        
      
        
        setTimeout(() => {

          if(currentURL !== '/prizes'){
            localStorage.clear();
            window.location.href = "/";
          }
        

          
        //   window.location = "/dashboard";
        
        
        }, 100);
        return error.response;
       
       
      }
     
      return Promise.reject(error);
    }
  );
  if (token) {
   
  
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};


export default Interceptor