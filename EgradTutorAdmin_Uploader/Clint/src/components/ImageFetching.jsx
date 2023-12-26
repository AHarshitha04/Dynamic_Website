import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import "../styles/ImageFetching.css";

const ImageFetching = () => {
  const [imageTitle, setImageTitle] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/ImageTitle")
      .then((res) => {
        setImageTitle(res.data);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
      });
  }, []);


  const [imageArray, setImageArray] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/HomeImages")
      .then((res) => {
        setImageArray(res.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);


  const handleDelete = (imageId) => {
    axios
      .delete(`http://localhost:5001/HomeImages/${imageId}`)
      .then(() => {
        // Remove the deleted image from the local state
        setImageArray((prevImages) =>
          prevImages.filter((image) => image.id !== imageId)
        );
        window.alert('Image deleted successfully!');
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  // const [updateData, setUpdateData] = useState({
  //   id: null,
  //   imageTitle: "",
  // });

  // const handleUpdate = (imageId) => {
  //   // Find the image data for the selected imageId
  //   const selectedImage = imageTitle.find(
  //     (image) => image.image_id === imageId
  //   );

  //   // Set the initial values in the update form
  //   setUpdateData({
  //     id: selectedImage.image_id,
  //     imageTitle: selectedImage.image_title,
  //   });
  // };

  return (
    <div className="Uploaded_Files">
      <h1>Images</h1>
      <br />
      <div >
      <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Images</th>
            <th>Action</th>
          
          </tr>
        </thead>
        <tbody>
          {imageTitle.map((imageName, index) => (
            <tr key={imageName.images_id}>
              <td>{index + 1}</td>
              <td>{imageName.image_title}</td>
              <td className="action">
                <Tooltip title="Delete" arrow>
                  <Button onClick={() => handleDelete(imageName.images_id)}>
                    <span className="material-symbols-outlined">delete</span>{" "}
                  </Button>
                </Tooltip>
              </td>
              {/* <td>
              {imageArray.length > 0 ? (
        <div className="imgss">
          {imageArray.map((image) => (
            <img
          width={50}
              key={image.id}
              src={image.imageData}
              alt={`Image ${image.id}`}
              // style={{ maxWidth: "100%", marginBottom: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
</div>
      <div>
      {imageArray.length > 0 ? (
        <div className="imgss">
          {imageArray.map((image) => (
            <img
              width={500}
              key={image.id}
              src={image.imageData}
              alt={`Image ${image.id}`}
              // style={{ maxWidth: "50px", marginBottom: "10px" }}
            />
          ))}
        </div>
      ) : (
        <p>No images found.</p>
      )}

      </div>
      </div>
    </div>
  );
};

export default ImageFetching;
