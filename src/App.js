import React, {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route, useHistory  } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Layout from "./components/Layout";
// import Home from "./pages/Home";
import Avatar from "./pages/Avatar";
// import Guess from "./pages/Guess";
import Landing from "./pages/Landing";
import Leaderboard from "./pages/Leaderboard";
// import Trivia from "./pages/Trivia";
import Profile from "./pages/Profile";
import AvatarHistory from "./pages/AvatarHistory";
import Help from "./pages/Help";
import Dashboard from "./pages/Dashboard";
import NewGuess from "./pages/NewGuess";
import HowToPlay from "./pages/HowToPlay";
import NewTrivia from "./pages/NewTrivia";
import Prizes from "./pages/Prizes/index1";
import {Protected} from "./Protected";
import HelpSupport from "./pages/HelpSupport";
import NewProfile from "./pages/NewProfile";
import RewardsPrizes from "./pages/RewardsPrizes";
import Redeemed from "./pages/Redeemed";
import interceptor from './utils/interceptor'
import Scramble from './pages/Scramble/Scramble';



import GuessHistory from './pages/gamehistory/gamehistroy'
// import ErrorPage from "./pages/ErrorPage";
import "antd/dist/antd.css";
import './App.css'
import Home2 from "./pages/landingPage/Home-2";
import ScrollToTop from './scroll-to-top';
import { signout } from './utils/authdata';
import AvatarGame from './pages/AvatarGame/avatar-game';
import ErrorBoundary from './components/Errorboundary/Errorboundary';

// Create a client 
const queryClient = new QueryClient();
// const Home2 = React.lazy(() => import('./pages/landingPage/Home-2'));
function App() {
  const history = useHistory()
  

  interceptor();

 
  return (
    <>
      <QueryClientProvider client={queryClient}>
      
        <Router>
        <ErrorBoundary>
        <ScrollToTop />
          <Switch>
            <Route exact path="/"  >
              <Home2 />
            </Route>
            <Route exact path="/how-to-play">
              <HowToPlay />
            </Route>
            <Route exact path="/help-support">
              <HelpSupport />
            </Route>
            <Route exact path="/prizes">
              <Prizes />
            </Route>
            <Route exact path="/home-2">
              <Landing />
            </Route>
            <Protected exact path="/avatars">
              <Layout>
                <AvatarGame />
              </Layout>
            </Protected>
                
            <Protected exact path="/avatars-history">
              <Layout>
                <AvatarHistory />
              </Layout>
            </Protected>
            <Protected exact path="/trivia-game">
              <Layout>
                <NewTrivia />
              </Layout>
            </Protected>
            <Protected exact path="/scramble">
              <Layout>
                <Scramble />
              </Layout>
            </Protected>
            
            <Protected exact path="/profile">
              <Layout>
                <NewProfile />
              </Layout>
            </Protected>
            <Protected exact path="/leaderboard">
              <Layout>
                <Leaderboard />
              </Layout>
            </Protected>
            <Protected exact path="/rewards-prizes">
              <Layout>
                <RewardsPrizes />
              </Layout>
            </Protected>
            <Protected exact path="/redeemed">
              <Layout>
                <Redeemed />
              </Layout>
            </Protected>
            {/* <Protected exact path="/trivia-game">
              <Layout>
                <Trivia />
              </Layout>
            </Protected> */}
            <Protected exact path="/transactions">
              <Layout>
                <Profile />
              </Layout>
            </Protected>
            <Protected exact path="/help">
              <Layout>
                <Help />
              </Layout>
            </Protected>
            <Protected  path="/dashboard" exact  component={Dashboard} />
              
            <Protected exact path="/guess-game">
              <Layout>
                <NewGuess />
              </Layout>
            </Protected>
            <Protected exact path="/history">
              <Layout>
                <GuessHistory />
              </Layout>
            </Protected>
       
          </Switch>
          </ErrorBoundary>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
        
      </QueryClientProvider>
      
    </>
  );
}


export default App;
