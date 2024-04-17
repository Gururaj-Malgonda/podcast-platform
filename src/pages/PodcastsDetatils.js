import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../components/common/Button/Button";

function PodcastsDetatils() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState({});

  console.log("ID", id);

  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    try {
      if (id) {
        const docRef = doc(db, "podcasts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setPodcast({ id: id, ...docSnap.data() });
          toast.success("Podcast Found!");
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
          toast.error("No such document!");
          navigate("/podcasts");
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Header />
      {podcast && (
        <div
          className="input-wrapper"
          style={{ width: "80%", marginTop: "2rem" }}
        >
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "0 0.5rem 0 0.5rem",
              }}
            >
              <h2 style={{ alignItems: "left", width: "100%" }}>
                {podcast.title}
              </h2>
              {podcast.createdBy == auth.currentUser.uid && (
                <Button
                  width={"250px"}
                  text={"Create Podcast"}
                  onclick={() => {
                    navigate(`/podcast/${id}/create-episode`);
                  }}
                />
              )}
            </div>

            <div className="banner-wrapper" style={{ width: "100%" }}>
              <img
                style={{ height: "320px", marginTo: "0" }}
                src={podcast.bannerImage}
              />
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h2 className="podcast-episode">Episodes</h2>
          </>
        </div>
      )}
    </div>
  );
}

export default PodcastsDetatils;
