//import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [power, setPower] = useState(true);
  const [activeKey, setActiveKey] = useState("");
  const [soundType, setSoundType] = useState(0);
  const [drumVolume, setDrumVolume] = useState(0.5);

  const sounds1 = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Heater-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Heater-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Heater-4",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Clap",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Kick-n'-Hat",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    },
  ];

  const sounds2 = [
    {
      keyCode: 81,
      keyTrigger: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    },
    {
      keyCode: 87,
      keyTrigger: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    },
    {
      keyCode: 69,
      keyTrigger: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    },
    {
      keyCode: 65,
      keyTrigger: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    },
    {
      keyCode: 83,
      keyTrigger: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    },
    {
      keyCode: 68,
      keyTrigger: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    },
    {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    },
    {
      keyCode: 88,
      keyTrigger: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    },
    {
      keyCode: 67,
      keyTrigger: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    },
  ];

  const sounds = [sounds1, sounds2];

  function playSound(selector) {
    if (power) {
      const audio = document.getElementById(selector);
      audio.volume = drumVolume;
      audio.currentTime = 0;
      audio.play();
    }
  }

  document.addEventListener("keydown", (event) => {
    if (
      ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].includes(
        event.key.toUpperCase()
      )
    ) {
      playSound(event.key.toUpperCase());
      const index = sounds[soundType].findIndex(
        (o) => o.keyTrigger === event.key.toUpperCase()
      );
      setActiveKey(sounds[soundType][index].id);
    }
  });

  useEffect(() => {
    if (soundType === 0) {
      setActiveKey("Heater Kit");
    } else if (soundType === 1) {
      setActiveKey("Smooth Piano Kit");
    }
  }, [soundType]);

  return (
    <div id="drum-machine" className="inner-container">
      <div className="logo">
        <div className="inner-logo">
          {"FCC "}
          <i className="inner-logo fa fa-free-code-camp" />
        </div>
      </div>
      <div className="controls-container">
        <div className="control">
          <p>Power</p>
          <div className="select" onClick={() => setPower(!power)}>
            <div
              className="inner"
              style={power ? { float: "right" } : { float: "left" }}
            ></div>
          </div>
        </div>
        <p id="display">{activeKey}</p>
        <div className="volume-slider">
          <p>Volume: {Math.floor(drumVolume * 100)}%</p>
          <input
            max={1}
            min={0}
            step={0.01}
            type="range"
            value={drumVolume}
            onChange={(e) => setDrumVolume(e.target.value)}
          ></input>
        </div>
        <div className="control">
          <p>Bank</p>
          <div
            className="select"
            onClick={() => setSoundType((soundType + 1) % 2)}
          >
            <div
              className="inner"
              style={soundType ? { float: "left" } : { float: "right" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="pad-bank">
        {sounds[soundType].map((drumPad) => (
          <div
            className="drum-pad"
            id={drumPad.id}
            key={drumPad.id}
            onClick={() => {
              playSound(drumPad.keyTrigger);
              setActiveKey(drumPad.id);
            }}
          >
            {drumPad.keyTrigger}
            <audio
              className="clip"
              id={drumPad.keyTrigger}
              src={drumPad.url}
            ></audio>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
