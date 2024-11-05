import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { user } = useParams();
  const [info, setinfo] = useState([]);
  async function CheckAuthenticity() {
    const cookie = localStorage.getItem("cookie");
    if (!cookie) {
      location.assign("/register");
      return;
    }
    try {
      const payload = await fetch(
        `http://localhost:3000/verifypayload/${cookie}`
      );
      const response = await payload.json();
      if (response.msg === "No name found") {
        location.assign("/register");
      }
      if (response.user.name !== user) {
        location.assign("/register");
      }
    } catch (err) {
      console.log(err);
    }
  }

  setInterval(() => CheckAuthenticity(), 9000);
  useEffect(() => {
    async function FetchData() {
      try {
        const request = await fetch(`http://localhost:3000/d/${user}`);
        const data = await request.json();
        setinfo(data);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
  }, []);
  return (
    <section id="dashboard" className=" background_pink">
      <div>
        {" "}
        <h1>{user}</h1>
        <h3>WELCOME , HERE YOU CAN SEE YOUR VICTIMS. Share your links below</h3>
        <h2>{`http://localhost:5173/play/${user}`}</h2>
        <table>
          <tr>
            <th>NAME</th>
            <th>CRUSH</th>
          </tr>
          {info.map((d) => (
            <tr>
              <td>{d.CurrentCrusher}</td>
              <td>{d.CurrentCrushee}</td>
            </tr>
          ))}
        </table>
      </div>
    </section>
  );
};

export default Dashboard;
