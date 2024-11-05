import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Play = () => {
  const [Crusher, setCrusher] = useState("");
  const [Crushee, setCrushee] = useState("");
  const [CrusherError, setCrusherError] = useState("");
  const [CrusheeError, setCrusheeError] = useState("");
  const { pranker } = useParams();
  useEffect(() => {
    async function CheckAuthetication() {
      const cookie = localStorage.getItem("cookie");
      if (cookie) {
        try {
          const request = await fetch(
            `http://localhost:3000/verifypayload/${cookie}`
          );
          const response = await request.json();
          if (response.user.name == pranker) {
            location.assign(`/d/${response.user.name}`);
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    CheckAuthetication();
  }, []);

  async function SendRequest(Crusher, Crushee) {
    try {
      const request = await fetch(`http://localhost:3000/play/${pranker}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Crusher, Crushee }),
      });
      const data = await request.json();
      if (data) {
        location.assign(`/prank/${pranker}`);
      }
    } catch (err) {
      console.log(err);
    }
  }
  function HandleSubmit() {
    if (Crusher === "") {
      setCrusherError("Enter your name");
      return;
    }
    if (Crushee === "") {
      setCrusheeError("Enter your lover");
      return;
    }
    SendRequest(Crusher, Crushee);
  }
  return (
    <section id="play" className="background_pink background_full">
      <div>
        <label htmlFor="name1">YOUR NAME</label>
        <input
          type="text"
          name="name1"
          placeholder="JOHN DOE"
          onChange={(e) => setCrusher(e.target.value)}
        />
        {CrusherError && <p className="err">{CrusherError}</p>}
        <label htmlFor="name2">CRUSH NAME</label>
        <input
          type="text"
          name="name2"
          placeholder="JANE DOE"
          onChange={(e) => setCrushee(e.target.value)}
        />
        {CrusheeError && <p className="err">{CrusheeError}</p>}
        <button onClick={HandleSubmit}>CALCULATE</button>
      </div>
    </section>
  );
};

export default Play;
