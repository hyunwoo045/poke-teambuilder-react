import React, { useState } from "react";
import SampleCreator from "./TeamContainer/SampleCreator";
import SampleBox from "./TeamContainer/SampleBox";

function TeamContainer() {
  return (
    <div id="team-container">
      <SampleCreator></SampleCreator>
      <SampleBox></SampleBox>
    </div>
  );
}

export default TeamContainer;
