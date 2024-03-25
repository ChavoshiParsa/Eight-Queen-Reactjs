import { useEffect, useState } from "react";

export default function Chessboard({ solution }: { solution: number[] }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const n = solution.length;
  const board: number[] = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (solution[i] == j) {
        board.push(1);
      } else {
        board.push(0);
      }
    }
  }

  let toggle = false;

  let boardSize: number;
  if (windowWidth < 768) {
    boardSize = (windowWidth - 50) / n;
  } else {
    boardSize = (windowHeight - 200) / n;
  }
  return (
    <div
      className="grid grid-cols-8 w-full h-full"
      style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}
    >
      {board.map((value, index) => {
        let color;
        if (index % n === 0) {
          if ((index / n) % 2 === 1) {
            toggle = true;
          } else {
            toggle = false;
          }
        }

        if (index % 2 === 0) {
          color = "rgb(250,250,250)";
          if (toggle) color = "rgb(9,9,11)";
        } else {
          color = "rgb(9,9,11)";
          if (toggle) color = "rgb(250,250,250)";
        }

        return (
          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: color,
              width: `${boardSize}px`,
              height: `${boardSize}px`,
            }}
            key={index}
          >
            {value === 1 && <Queen />}
          </div>
        );
      })}
    </div>
  );
}

const Queen = () => (
  <svg
    className="p-px"
    fill="#6b42ff"
    viewBox="0 0 32 32"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    stroke="#6b42ff"
    strokeWidth="0.00032"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <title>queen-crown</title>{" "}
      <path d="M28.553 4.694c-1.104 0-1.998 0.895-1.998 1.999 0 0.669 0.329 1.26 0.833 1.623l-3.16 4.962c0.673 0.357 1.132 1.064 1.132 1.879 0 1.173-0.951 2.125-2.124 2.125s-2.124-0.951-2.124-2.125c0-1.067 0.786-1.95 1.811-2.102l-2.168-5.088c0.954-0.223 1.665-1.078 1.665-2.1 0-1.191-0.965-2.157-2.156-2.157s-2.156 0.966-2.156 2.157c0 0.923 0.58 1.711 1.396 2.019l-2.777 4.737c0.912 0.282 1.574 1.132 1.574 2.137 0 1.235-1.001 2.237-2.236 2.237s-2.236-1.001-2.236-2.237c0-0.946 0.587-1.754 1.416-2.081l-2.755-4.785c0.826-0.302 1.416-1.095 1.416-2.027 0-1.191-0.965-2.157-2.156-2.157s-2.156 0.966-2.156 2.157c0 1.003 0.685 1.847 1.613 2.088l-2.204 5.112c0.99 0.181 1.74 1.047 1.74 2.090 0 1.173-0.951 2.125-2.124 2.125s-2.124-0.951-2.124-2.125c0-0.834 0.481-1.556 1.18-1.904l-3.17-4.943c0.5-0.363 0.825-0.952 0.825-1.617 0-1.104-0.895-1.999-1.998-1.999s-1.998 0.895-1.998 1.999 0.895 1.999 1.998 1.999c0.046 0 0.092-0.002 0.138-0.005l2.826 15.312c-1.712 0.045-1.717 2.507 0.048 2.507h0.415l0.004 0.020h18.364l0.004-0.020h0.475c1.718 0 1.749-2.508 0-2.508h-0.013l2.826-15.311c0.045 0.003 0.091 0.005 0.137 0.005 1.104 0 1.998-0.895 1.998-1.999s-0.895-1.999-1.998-1.999z"></path>{" "}
    </g>
  </svg>
);
