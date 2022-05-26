import type { Component } from "solid-js";

const Tree: Component = () => {
  const goBoard = {
    w: 4242,
    h: 4545,
    squares: 19,
    squareW: 220,
    squareH: 237,
    line: 10,
    starPointD: 40,
    stoneD: 225,
  };

  //TODO:
  // - Create master element, that we can control the size
  // - Render svg inside element, not overflowing
  // - Set svg viewbox to poe skill tree view box

  const marginX = (goBoard.w - goBoard.squareW * (goBoard.squares - 1)) / 2;
  const marginY = (goBoard.h - goBoard.squareH * (goBoard.squares - 1)) / 2;

  const lineLengthY = goBoard.h - marginY;
  const columns = [...Array(goBoard.squares)].map((_, i) => {
    const mX = marginX + goBoard.squareW * i;
    return (
      <path
        d={`M${mX},${marginY} V${lineLengthY}`}
        fill="none"
        stroke="black"
        stroke-width={goBoard.line}
      />
    );
  });

  const lineLengthX = goBoard.w - marginX;
  const rows = [...Array(goBoard.squares)].map((_, i) => {
    const mY = marginY + goBoard.squareH * i;
    return (
      <path
        d={`M${marginX},${mY} H${lineLengthX}`}
        fill="none"
        stroke="black"
        stroke-width={goBoard.line}
      />
    );
  });

  const stars = [3, 9, 15].map((i) =>
    [3, 9, 15].map((j) => {
      const d = goBoard.starPointD;

      const off = d / 2;

      const x = i * goBoard.squareW + marginX - off;
      const y = j * goBoard.squareH + marginY - off;

      return (
        <rect
          x={x}
          y={y}
          width={d}
          height={d}
          transform={`rotate(45 ${x + off} ${y + off})`}
        />
      );
    })
  );

  const stone = (color: "black" | "white", goX: number, goY: number) => (
    <circle
      fill={color}
      stroke="black"
      stroke-width={goBoard.line}
      r={goBoard.stoneD / 2}
      cx={marginX + goBoard.squareW * goX}
      cy={marginY + goBoard.squareH * goY}
    />
  );

  const B = (x: number, y: number) => stone("black", x, y);
  const W = (x: number, y: number) => stone("white", x, y);

  return (
    <svg
      class="tree"
      version="1.1"
      // viewBox={`${x} ${y} ${width} ${height}`}
      width={700}
      height={700}
      viewBox={`0 0 ${goBoard.w} ${goBoard.h}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="board">
        <path
          d={`M${0},${0} H${goBoard.w} V${goBoard.h} H0 V0`}
          fill="#DAB888"
        />
        <g class="rows">{rows}</g>
        <g class="columns">{columns}</g>
        <g class="stars">{stars}</g>
      </g>
      <g class="stones">
        {[
          B(3, 3),
          W(3, 4),
          B(2, 4),
          W(3, 5),
          B(2, 5),
          B(3, 6),
          W(5, 4),
          B(4, 4),
        ]}
      </g>
    </svg>
  );
};

export default Tree;
