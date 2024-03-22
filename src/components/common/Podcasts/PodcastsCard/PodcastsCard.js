import React from "react";
import { Link } from "react-router-dom";
import "./PodcastsCard.css";

function PodcastsCard({ id, title, displayImage }) {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <img className="podcast-image" src={displayImage} />
        <p className="title">{title}</p>
      </div>
    </Link>
  );
}

export default PodcastsCard;
