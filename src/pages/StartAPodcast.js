import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import PodcastForm from "../components/StartAPodcast/PodcastForm";

function StartAPodcast() {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1 style={{ textAlign: "center" }}>Create new Podcast</h1>
        <PodcastForm />
      </div>
    </div>
  );
}

export default StartAPodcast;
