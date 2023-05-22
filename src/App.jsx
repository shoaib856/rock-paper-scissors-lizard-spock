import { useEffect, useRef, useState } from "react";

import logo from "./assets/images/logo-bonus.svg";

import rock from "./assets/images/icon-rock.svg";
import paper from "./assets/images/icon-paper.svg";
import scissors from "./assets/images/icon-scissors.svg";
import lizard from "./assets/images/icon-lizard.svg";
import spock from "./assets/images/icon-spock.svg";

import iconClose from "./assets/images/icon-close.svg";
import imageRules from "./assets/images/image-rules-bonus.svg";

import GetStarted from "./GetStarted";
import Game from "./Game";

export const iconBag = {
  rock,
  paper,
  scissors,
  lizard,
  spock,
};

function App() {
  const [count, setCount] = useState(0);
  const [userChoice, setUserChoice] = useState(null);
  const [houseChoice, setHouseChoice] = useState(null);
  const rulesRef = useRef(null);

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="Rock-Paper-Scissors" />
        </div>
        <div className="score">
          <p className="score-text">SCORE</p>
          <p className="score-number">{count}</p>
        </div>
      </header>

      {userChoice ? (
        <Game
          userChoice={userChoice}
          houseChoice={houseChoice}
          count={count}
          setCount={setCount}
          setUserChoice={setUserChoice}
          setHouseChoice={setHouseChoice}
        />
      ) : (
        <GetStarted setUserChoice={setUserChoice} />
      )}
      <button
        type="button"
        onClick={() => {
          rulesRef.current.showModal();
        }}
        className="rules-btn"
      >
        RULES
      </button>
      <dialog
        ref={rulesRef}
        className="rounded-lg w-full sm:max-w-md sm:w-full p-8 backdrop:backdrop-blur"
      >
        <div className="flex justify-between items-center mb-10">
          <p className="text-3xl text-[hsl(229,_25%,_31%)]">RULES</p>
          <button
            onClick={() => {
              rulesRef.current.close();
            }}
            className="close-btn"
          >
            <img src={iconClose} alt="close" />
          </button>
        </div>
        <img
          className="w-full"
          src={imageRules}
          alt={`paper => rock, rock => scissors, scissors => paper`}
        />
      </dialog>
    </>
  );
}

export default App;
