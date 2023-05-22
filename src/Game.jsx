import { useEffect, useState } from "react";
import { iconBag } from "./App";
import PropTypes from "prop-types";

const Game = ({
  userChoice,
  houseChoice,
  count,
  setCount,
  setUserChoice,
  setHouseChoice,
}) => {
  const [winner, setWinner] = useState(null);

  const randomSelection = () => {
    const choice = ["paper", "rock", "scissors", "lizard", "spock"][
      crypto.getRandomValues(new Uint32Array(1))[0] % 3
    ];
    setHouseChoice({ choice, icon: iconBag[choice] });
  };

  useEffect(() => {
    if (userChoice) {
      randomSelection();
    }
  }, [userChoice]);

  useEffect(() => {
    if (houseChoice) {
      if (userChoice.choice === houseChoice.choice) {
        setWinner("draw");
        setCount(count);
      } else if (
        (userChoice.choice === "rock" && houseChoice.choice === "scissors") ||
        (userChoice.choice === "paper" && houseChoice.choice === "rock") ||
        (userChoice.choice === "scissors" && houseChoice.choice === "paper") ||
        (userChoice.choice === "rock" && houseChoice.choice === "lizard") ||
        (userChoice.choice === "lizard" && houseChoice.choice === "spock") ||
        (userChoice.choice === "spock" && houseChoice.choice === "scissors") ||
        (userChoice.choice === "scissors" && houseChoice.choice === "lizard") ||
        (userChoice.choice === "lizard" && houseChoice.choice === "paper") ||
        (userChoice.choice === "paper" && houseChoice.choice === "spock") ||
        (userChoice.choice === "spock" && houseChoice.choice === "rock")
      ) {
        setWinner(true);
        setCount(count + 1);
      } else {
        setWinner(false);
        setCount(count > 0 ? count - 1 : 0);
      }
    }
  }, [houseChoice, userChoice]);

  return (
    <div className="game-container">
      <div className="choice you">
        <p>YOU PICKED</p>
        <div
          className={`icon-bg icon-bg-${userChoice?.choice} ${
            winner === true && "winner-effect"
          }`}
        >
          <div className="icon">
            <img src={userChoice?.icon} alt="userChoice" />
          </div>
        </div>
      </div>
      {winner !== null && (
        <div className="winner-status">
          <p className="winner-text">
            {winner === "draw" ? "DRAW" : winner ? "YOU WIN" : "YOU LOSE"}
          </p>
          <button
            onClick={() => {
              setWinner(null);
              setUserChoice(null);
              setHouseChoice(null);
            }}
            className="play-again-btn"
          >
            PLAY AGAIN
          </button>
        </div>
      )}
      <div className="choice opponent">
        <p>OPPONENT PICKED</p>
        {houseChoice ? (
          <div
            className={`icon-bg icon-bg-${houseChoice?.choice} ${
              winner === false && "winner-effect"
            }`}
          >
            <div className="icon">
              <img src={houseChoice?.icon} alt="House Picked" />
            </div>
          </div>
        ) : (
          <div className="icon-shadow"></div>
        )}
      </div>
    </div>
  );
};
export default Game;

Game.propTypes = {
  userChoice: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  setUserChoice: PropTypes.func.isRequired,
};
