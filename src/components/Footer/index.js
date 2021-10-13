import React from "react";

export default function Footer(props) {
  return (
    <div className="footer">Player {props.turn == "X" ? 1 : 2}'s turn</div>
  );
}
