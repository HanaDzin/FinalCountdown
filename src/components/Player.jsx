import { useState, useRef } from "react";

export default function Player() {
  /* using useState:
    const [name, setName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleChangeName(e) {
      setName(e.target.value);
    }

    function handleClick() {
      setSubmitted(true);
    } */

  //using useRef:
  const [name, setName] = useState("stranger");
  const playerName = useRef();

  function handleClick() {
    setName(playerName.current.value);
    playerName.current.value = "";
  }

  return (
    <section id="player">
      <h2>Welcome, {name ?? "stranger"}!</h2>
      <p>
        <input type="text" ref={playerName} placeholder="Enter your name" />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
