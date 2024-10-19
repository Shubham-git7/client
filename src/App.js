import { BrowserRouter,Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js/index.js"
import Loader from "./components/Loader.js";
import { useEffect   } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, setPortfolioData, showLoading, reloadData } from "./redux/rootSlice.js";
import Admin from "./pages/Admin/index.js";
import Login from "./pages/Admin/Login.js";
function App() {
  const  {loading ,  portfolioData ,reloadData} = useSelector((state) => state.root);
  const dispatch = useDispatch();
  const getPortfolioData = async  () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/portfolio/get-portfolio-data");
      dispatch(setPortfolioData(response.data)); 
      dispatch(reloadData(false));
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() =>{
    // console.log(portfolioData);
    
    if(!portfolioData){      
      getPortfolioData();
    }
  }, [portfolioData]);  

//  useEffect(()=>{
//     if(reloadData){
//       getPortfolioData();
//     }
//  },[reloadData]);
 useEffect(() => {
  if (reloadData) {
    getPortfolioData();
  }
}, [reloadData]);


  return (
   <BrowserRouter>        
   {loading ? <Loader /> : null}
   <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/admin" element={<Admin />}/>
    <Route path="/admin-login" element={<Login />}/>
    
   </Routes>
   </BrowserRouter>
  );
}

export default App;
