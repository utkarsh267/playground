import './App.css';
import { Home } from './pages/Home';
import SelectDropDown from './components/SelectDropDown';

function App() {
  return (
    <div className="App">
      <Home/>
      {/* <SelectDropDown formData={{name: "a", age: "Ten", phone: "22"}} /> */}
    </div>
  );
}

export default App;
