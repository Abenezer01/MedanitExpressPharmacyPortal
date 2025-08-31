import React from "react";
import { getProfilePictureURL } from "src/services/utils/file";

const StructureCard = ({ d }: { d: any }) => {
  const color = "#fff"; // Adjust the color as needed
  const imageDiffVert = 20; // Adjust the vertical padding as needed

  const containerStyle = {
    width: `${d.width}px`,
    height: `${d.height}px`,
    paddingTop: `${imageDiffVert - 2}px`,
    paddingLeft: "1px",
    paddingRight: "1px",
  };

  const innerStyle = {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: color,
    marginLeft: "-1px",
    width: `${d.width - 2}px`,
    height: `${d.height - imageDiffVert}px`,
    borderRadius: "10px",
    border: "1px solid #E4E2E9",
  };

  const avatarContainerStyle = {
    backgroundColor: color,
    marginTop: `${-imageDiffVert - 20}px`,
    marginLeft: "15px",
    borderRadius: "50%", // make it circular
    width: "50px",
    height: "50px",
    overflow: "hidden", // clip content outside the container
  };

  const nameStyle = {
    fontSize: "15px",
    color: "#08011E",
    marginLeft: "20px",
    marginTop: "10px",
  };

  const positionStyle = {
    color: "#716E7B",
    marginLeft: "20px",
    marginTop: "3px",
    fontSize: "10px",
  };

  const departmentStyle = {
    fontSize: "15px",
    color: "#08011E",
    marginLeft: "20px",
    marginTop: "5px",
  };

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        {d.data?.head && (
          <div style={avatarContainerStyle}>
            <img
              src={getProfilePictureURL(d.data?.head?.id)}
              alt="avatar"
              style={{
                width: "100%", // occupy 100% of the container width
                height: "100%", // occupy 100% of the container height
                objectFit: "cover", // You can use 'contain', 'cover', 'fill', 'none', or 'scale-down'
              }}
            />
          </div>
        )}

        <div style={nameStyle}>{d.data?.head?.full_name}</div>
        <div style={positionStyle}>{d.data?.position?.name}</div>
        <div style={departmentStyle}>{d.data.name}</div>
      </div>
    </div>
  );
};

export default StructureCard;
