import React from "react";
import { Board } from "./Board";
import { calculateWinner } from "../index";
import styles from "./Game.module.scss";
import { GameInfo } from "./GameInfo";
import cn from "classnames";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const { history, stepNumber } = this.state;
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move > 0 ? "Go to move #" + move : "Go to game start";

      return (
        <li key={move} className={styles.travelItem}>
          <button
            className={cn(styles.btn, {
              [styles.active]: move === stepNumber
            })}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      );
    });
    let status;

    if (winner) {
      status = "Winner is:" + winner.player;
    } 
    else {
      status = "Next player is:" + (this.state.xIsNext ? " X " : " O ");
    }
    return (
      <div className={styles.game}>
        <Board squares={current.squares} winLine={winner && winner.line} onClick={i => this.handleClick(i) } />
        <GameInfo status={status} moves={moves} />
      </div>
    );
  }
}
