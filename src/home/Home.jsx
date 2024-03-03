import React from "react";

export default function Home() {
  let showinui = localStorage.getItem("fullname");
  let role = localStorage.getItem("role");

  return (
    <div style={{ margin: "20px " }}>
      
      {
        (role==="admin")? <h1>
          DashBord
      </h1>:<h1>
        {showinui
          ? "Welcome" + " " + showinui.toUpperCase()
          : "Welcome as a Guest"}
      </h1>
      }

      <p>{(role==="admin")
          ? "Welcome to Admin Panel" 
          : ""}</p>



    </div>
  );
}
