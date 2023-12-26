import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./components/UploadPage";
import ImageFetching from "./components/ImageFetching";
import WebsiteAdmin from "./pages/WebsiteAdmin";
import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <LeftSidebar/>
      <Routes>
        <Route path="/" element={<WebsiteAdmin/>} />
        <Route path="/UploadPage" element={<UploadPage />} />
        <Route path="/ImageFetching/" element={<ImageFetching />} />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;