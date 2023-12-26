import React from "react";
import LeftSidebar from "../components/LeftSidebar";
import Header from "../components/Header";
import UploadPage from "../components/UploadPage";

import "../styles/WebsiteAdmin.css";

const WebsiteAdmin = () => {
  return (
    <div className="admin_page">
      <div>
        {/* <Header /> */}
      </div>
      <div className="main_page_content">
        {/* <LeftSidebar /> */}
        <div className="upload_page">
          <UploadPage />
        </div>
      </div>
    </div>
  );
};

export default WebsiteAdmin;
