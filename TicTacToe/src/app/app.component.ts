import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldComponent } from './components/field/field.component';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldComponent, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected readonly gameStatus: WritableSignal<number> = signal(0);
  protected readonly boardState: WritableSignal<number[][]> = signal([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);

  protected readonly currentPlayer: WritableSignal<number> = signal(-1);

  public togglePlayer() {
    this.currentPlayer.update(player => (player === -1 ? 1 : -1));
  }

  protected updateBoard(row: number, col: number) {
    if (this.gameStatus() !== 0) return;
    this.boardState.update(board => {
      if (board[row][col] === 0) {
        board[row][col] = this.currentPlayer();
        this.togglePlayer();
        this.gameStatus.set(this.checkForWinner(board));
      }
      return board;
    });
  }

  protected resetBoard() {
    this.gameStatus.set(0);
    this.boardState.update(board => {
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          board[i][j] = 0;
        }
      }
      return board;
    });
  }

  private checkForWinner(board: number[][]): number {
    for (let i = 0; i < 3; i++) {
      const rowCheck = board[i][0] + board[i][1] + board[i][2];
      const colCheck = board[0][i] + board[1][i] + board[2][i];
      if (rowCheck === 3 || colCheck === 3) return 1;
      if (rowCheck === -3 || colCheck === -3) return -1;
    }

    // Check diagonals for a win
    const diagonal1 = board[0][0] + board[1][1] + board[2][2];
    const diagonal2 = board[0][2] + board[1][1] + board[2][0];
    if (diagonal1 === 3 || diagonal2 === 3) return 1;
    if (diagonal1 === -3 || diagonal2 === -3) return -1;

    // If all cells are filled and no winner
    if (board.every(row => row.every(cell => cell !== 0))) return 404;

    // No winner or tie
    return 0;
  }
}
