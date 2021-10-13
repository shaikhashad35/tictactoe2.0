import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import GridRow from "../GridRow";
import GridItem from "../GridItem";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerTurn: "X",
      boardState: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      count: 0,
    };
  }
  playerCLickCB = (i, j) => {
    console.log(this.state.playerTurn);
    if (this.state.boardState[i][j] == "") {
      const currBoardState = [...this.state.boardState];
      currBoardState[i][j] = this.state.playerTurn;
      this.setState({
        boardState: currBoardState,
        playerTurn: this.state.playerTurn == "X" ? "O" : "X",
        count: this.state.count + 1,
      });
    }
  };
  //bcoz will be called after every render  or update of DOM so we can check
  componentDidUpdate(prevProps, prevState) {
    //checking for rows
    let combination = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7],
    ];

    let win = true;
    for (let i = 0; i < combination.length; i++) {
      win = true;
      for (let j = 0; j < 3; j++) {
        const [m, n] = this.idToIndex(combination[i][j]);
        if (this.state.boardState[m][n] != prevState.playerTurn) {
          win = false;
          break;
        }
      }
      if (win == true) {
        this.alertWin(prevState.playerTurn);
      }
    }
    if (this.state.count == 9) {
      this.alertDraw();
    }
  }
  idToIndex = (id) => {
    let n_id = Number(id);
    return [Math.ceil(n_id / 3) - 1, (n_id - 1) % 3];
  };
  alertWin = (playerName) => {
    if (playerName == "X") {
      alert("Congratulations..!! Player 1 Wins");
    } else {
      alert("Congratulations..!! Player 2 Wins");
    }
    this.resetGame();
  };
  alertDraw = () => {
    alert("Draw!!");

    this.resetGame(true);
  };
  resetGame(isDraw) {
    this.setState({
      playerTurn: isDraw
        ? this.state.playerTurn
        : this.state.playerTurn == "X"
        ? "O"
        : "X",
      boardState: [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
      ],
      count: 0,
    });
    console.log(isDraw + this.state.playerTurn);
  }
  render() {
    console.log("Render" + this.state.playerTurn + this.state.boardState);
    return (
      <div className="container">
        <Header />
        <div className="board">
          {this.state.boardState.map((boardRow, rowIdx) => {
            return (
              <GridRow
                key={rowIdx}
                row={boardRow}
                rowIdx={rowIdx}
                playerClickCB={this.playerCLickCB}
              />
            );
          })}
        </div>
        <Footer turn={this.state.playerTurn} />
      </div>
    );
  }
}
