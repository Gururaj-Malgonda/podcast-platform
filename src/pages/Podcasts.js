import React, { useEffect, useState } from "react";
import Header from "../components/common/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { setPodcasts } from "../slices/podcastSlice";
import Input from "../components/common/Input/Input";
import PodcastsCard from "../components/common/Podcasts/PodcastsCard/PodcastsCard";

function Podcasts() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const Podcasts = useSelector((state) => state.podcasts.podcasts);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts")),
      (querySnapshot) => {
        const podcastsData = [];
        querySnapshot.forEach((doc) => {
          podcastsData.push({ id: doc.id, ...doc.data() });
        });
        dispatch(setPodcasts(podcastsData));
      },
      (error) => {
        console.log("Error fetching podcasts:".error);
      }
    );
    return () => {
      unsubscribe();
    };
  }, [dispatch]);
  var filteredPodcasts = Podcasts.filter((item) =>
    item.title.trim().toLowerCase().includes(search.trim().toLowerCase())
  );
  // var filteredPodcasts = Podcasts.filter((item) => {
  //   return item.toLowerCase().includes(search.toLowerCase());
  // });
  // console.log(Podcasts);
  console.log(filteredPodcasts);
  return (
    <div>
      <Header />
      <div className="podcast-wrapper" style={{ marginTop: "1rem" }}>
        <h1 style={{ textAlign: "center" }}>Discover Podcasts</h1>
        <Input
          type="text"
          state={search}
          setState={setSearch}
          placeholder="Search by Title..."
        />
        {filteredPodcasts.length > 0 ? (
          <div className="podcasts-flex">
            {filteredPodcasts.map((item) => (
              <PodcastsCard
                key={item.id}
                id={item.id}
                title={item.title}
                displayImage={item.displayImage}
              />
            ))}
          </div>
        ) : (
          <p>{search ? "Podcast Not Found" : "No Podcasts on the platform!"}</p>
        )}
      </div>
    </div>
  );
}

export default Podcasts;
