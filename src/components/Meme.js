import React, { useEffect, useState } from "react";

const Meme = () => {
  // function getMemeImage() {
  //     console.log("clicked");
  // }

  // const [memeImage, setMemeImage] = useState(
  //   "https://i.imgflip.com/30b1gx.jpg"
  // );

  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/43a45p.png",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    console.log("Effect on");
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMemes(data.data.memes)); 
  }, [])
  
  console.log(allMemes);

  let url;
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }));
  }

  return (
    <main>
      <p>{url}</p>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="Top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form--input"
          placeholder="Bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form-button">
          Get a new meme image
        </button>
      </div>

      <div className="meme">
        <img
          src={meme.randomImage}
          alt="alt img lol it was required"
          className="meme--image"
        />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>

    </main>
  );
};

export default Meme;
