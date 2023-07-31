import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyWallet from "./components/MyWallet";
import About from "./components/About";
import Fashion from "./components/Fashion";
import Grocery from "./components/Grocery";
import ElectronicItem from "./components/ElectronicItem";
import ItemState from "./context/itemState";
import Signup from "./components/Signup";
import Login from "./components/Login";
import MyItem from "./components/MyItem";

global.isUser = false;
global.isVendor = false;


function App() {
  return (
    <>

      <ItemState>
        <BrowserRouter>
          <Navbar name="MSS Store" />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/mywallet" element={<MyWallet />} />
            <Route path="/fashion" element={<Fashion />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/electronicitem" element={<ElectronicItem />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myitem" element={<MyItem />} />

          </Routes>
        </BrowserRouter>
      </ItemState>
    </>
  )
}

export default App;
