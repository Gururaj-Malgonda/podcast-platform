import React, { useState } from "react";
import Input from "../common/Input/Input";
import Button from "../common/Button/Button";
import { toast } from "react-toastify";
import InputFile from "../common/Input/InputFile";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

function PodcastForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    if (title && desc && displayImage && bannerImage) {
      // 1. Upload files and create downloadable links
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageURL = await getDownloadURL(bannerImageRef);
        console.log("Banner Image URL: ", bannerImageURL);

        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(displayImageRef, displayImage);
        const displayImageURL = await getDownloadURL(displayImageRef);
        console.log("Display Image URL: ", displayImageURL);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageURL,
          displayImage: displayImageURL,
          createdBy: auth.currentUser.uid,
        };

        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        toast.success("Creating a podcast!");
        setLoading(false);
        setDesc("");
        setTitle("");
        setBannerImage(null);
        setDisplayImage(null);
      } catch (error) {
        toast.error(error.message);
      }
      // 2. create a new doc in new collection called podcasts
      // 3. save this new podcastepisodes states in our podcasts
    } else {
      toast.error("All Fields Are Mandatory!");
      setLoading(false);
    }
  };

  const handleBannerImage = (file) => {
    setBannerImage(file);
  };
  const handleDisplayImage = (file) => {
    setDisplayImage(file);
  };

  return (
    <div style={{ width: "100%" }}>
      <Input
        type="text"
        state={title}
        setState={setTitle}
        placeholder="Title"
        required={true}
      />
      <Input
        type="text"
        state={desc}
        setState={setDesc}
        placeholder="Podcast description"
        required={true}
      />
      <InputFile
        accept={"image/*"}
        id={"banner-image-input"}
        fileHandleFunc={handleBannerImage}
        text={"Upload Banner Image"}
      />
      <InputFile
        accept={"image/*"}
        id={"display-image-input"}
        fileHandleFunc={handleDisplayImage}
        text={"Upload Display Image"}
      />
      <Button
        text={loading ? "Loading..." : "Start A Podcast"}
        disabled={loading}
        onclick={handleSubmit}
      />
    </div>
  );
}

export default PodcastForm;
