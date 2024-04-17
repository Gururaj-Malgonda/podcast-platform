import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Input from "../components/common/Input/Input";
import InputFile from "../components/common/Input/InputFile";
import Button from "../components/common/Button/Button";
import { toast } from "react-toastify";

function CreateAnEpisode() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAudioFile = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if ((title, desc, audioFile)) {
      try {
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("All Fields Should Be Filled");
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create A New Podcast Episode</h1>
        <Input
          type="text"
          state={title}
          setState={setTitle}
          placeholder="Enter Episode Title"
          required={true}
        />
        <Input
          type="text"
          state={desc}
          setState={setDesc}
          placeholder="Enter Episode Description"
          required={true}
        />
        <InputFile
          accept={"audio/*"}
          id={"audio-file-input"}
          fileHandleFunc={handleAudioFile}
          text={"Upload Episode Audio File"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onclick={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateAnEpisode;
