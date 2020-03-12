import React from 'react';
import { Square } from './Square';
import styles from './Board.module.scss';

export class Board extends React.Component {
  
  renderSquare(i) {
    const winLine = this.props.winLine;

   // Se tem win line & se inclui o indice 
    return (<Square value={this.props.squares[i]} winner={winLine && winLine.includes(i)} onClick={() => this.props.onClick(i)} />);
  }
  render() {
    return (<div className={styles.gameBoard}>
      <div className={styles.boardRow}>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
      <div className={styles.boardRow}>
        {this.renderSquare(3)}
        {this.renderSquare(4)}
        {this.renderSquare(5)}
      </div>
      <div className={styles.boardRow}>
        {this.renderSquare(6)}
        {this.renderSquare(7)}
        {this.renderSquare(8)}
      </div>
    </div>);
  }
}
