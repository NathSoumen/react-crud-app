import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Form from './screens/FormScreen/Form'
import AddMemory from "./screens/MemoryScreen/AddMemory";
import Memo from "./screens/MemoryScreen/Memo";
import MemoryScreen from "./screens/MemoryScreen/MemoryScreen";
import EditMemory from './screens/MemoryScreen/EditMemory'
import About from "./screens/about/About";
import Mypost from "./screens/MemoryScreen/Mypost";
import Errorpage from './Errorpage'
function App() {
  return (
    
    <BrowserRouter>
    <div className="App">
          <Navbar/>
      <Switch>
          <Route path="/" exact component={MemoryScreen} />
          <Route path="/user"  component={Form} />
          <Route path="/about"  component={About} />
          <Route path="/mypost"  component={Mypost} />
          <Route path="/memo/add"  component={AddMemory} /> 
          <Route path="/memo/:id/edit"  component={EditMemory} />  
          <Route path="/memo/:id"  component={Memo} /> 
          <Route path="*"  component={Errorpage} /> 
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
