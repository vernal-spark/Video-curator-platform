import './App.css';
import HomePage from './components/HomePage'
import VideoPage from './components/VideoPage'
import {Switch,Route} from 'react-router-dom'
export const config={
  endpoint:'https://xflix-backend-0qye.onrender.com/'
}
function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/video/:videoId'><VideoPage/></Route>
        <Route path='/'><HomePage/></Route>
      </Switch>
    </div>
  );
}

export default App;
