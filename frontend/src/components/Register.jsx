import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    async function Authentication() {
      const cookie = localStorage.getItem("cookie");
      console.log(cookie);
      if (cookie) {
        try {
          const request = await fetch(
            `http://localhost:3000/verifypayload/${cookie}`
          );
          const user = await request.json();
          const name = user.user.name;
          if (name) location.assign(`/d/${name}`);
        } catch (err) {
          console.log(err);
        }
        return;
      }
    }
    Authentication();
  }, []);

  function StoreValue(item) {
    localStorage.setItem("cookie", item);
  }
  async function SendRequestName(name) {
    try {
      const response = await fetch(`http://localhost:3000/register/${name}`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: null,
      });
      const data = await response.json();
      console.log(data);
      if (data.payload) {
        location.assign(`/d/${data.user.name}`);
        StoreValue(data.payload);
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function Handlesubmit() {
    if (name === "") {
      setErr("Input your correct name");
      return;
    }

    await SendRequestName(name);
  }
  return (
    <section className="background_pink" id="register">
      <div>
        <Link to="/dashboard"></Link>
        <label htmlFor="name"> INPUT YOUR NAME</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
        />
        {err && <p className="err">{err}</p>}
        <button
          type="submit"
          className="background_pink"
          onClick={Handlesubmit}
        >
          {" "}
          SUBMIT
        </button>
      </div>
    </section>
  );
};

export default Register;
