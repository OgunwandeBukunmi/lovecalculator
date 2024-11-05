import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const Prank = () => {
  const { pranker } = useParams();

  return (
    <section id="prank" className="background_pink background_full">
      <h1>{pranker}</h1>
      <h3>HAS PLAYED A PRANK ON YOU</h3>
      <Link to="/register"> DO YOUR OWN</Link>
    </section>
  );
};

export default Prank;
