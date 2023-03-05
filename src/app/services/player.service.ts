import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { createNewPlayer, PlayerModel } from '../models/player.model';
@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private allPlayers: PlayerModel[] = [];
  private defaultPlayers: PlayerModel[] = [];
  private isShowDefaultPlayers = false;

  public playersFlow$ = new Subject<PlayerModel[]>();

  constructor() {
    this.setDefaultPlayers();
  }

  public toggleDefaultMode(): void {
    this.isShowDefaultPlayers = !this.isShowDefaultPlayers;
    if (this.isShowDefaultPlayers) {
      this.allPlayers = [...this.allPlayers, ...this.getDefaultPlayers()];
    } else {
      this.allPlayers = this.allPlayers.filter(
        (player) =>
          !this.defaultPlayers.map((player) => player.id).includes(player.id)
      );
    }
    this.playersFlow$.next(this.allPlayers);
  }

  public getDefaultPlayers(): PlayerModel[] {
    return this.defaultPlayers;
  }

  public getPlayers(): PlayerModel[] {
    return this.allPlayers;
  }

  public removePlayer(id: number): void {
    const idx = this.allPlayers.findIndex((player) => player.id === id);
    if (idx !== -1) {
      this.allPlayers.splice(idx, 1);
    }
  }

  public addPlayer(
    name: string,
    imagePath: string = 'assets/default.jpg'
  ): void {
    const newPlayer = createNewPlayer({
      id: this.allPlayers[this.allPlayers.length - 1]?.id + 1 || 1,
      name: name,
      imgLink: imagePath,
      lapsValues: [0, 0, 0, 0, 0, 0],
      isWinner: false,
      isLoser: false,
    });
    this.allPlayers.push(newPlayer);
    this.playersFlow$.next(this.allPlayers);
  }

  public endGame(): void {
    let winner = this.allPlayers[0],
      loser: PlayerModel;
    let curMin = this.allPlayers[0].totalScore,
      curMax = 0;
    this.allPlayers.forEach((player) => {
      if (player.totalScore > curMax) {
        loser = player;
        curMax = player.totalScore;
      }
      if (player.totalScore < curMin) {
        winner = player;
        curMin = player.totalScore;
      }
    });
    winner ? (winner.isWinner = true) : null;
    loser ? (loser.isLoser = true) : null;
  }

  public resetGame(): void {
    for (let player of this.allPlayers) {
      player.isLoser = false;
      player.isWinner = false;
      player.lapsValues = [0, 0, 0, 0, 0];
    }
    this.playersFlow$.next(this.allPlayers);
  }

  public setDefaultPlayers(): void {
    const artem = createNewPlayer({
      id: 1,
      name: 'АРТЕМ',
      imgLink: 'assets/1.jpg',
      lapsValues: [0, 0, 0, 0, 0, 0],
      isWinner: false,
      isLoser: false,
    });
    const daniil = createNewPlayer({
      id: 2,
      name: 'АНДРЕЙ',
      imgLink: 'assets/1.jpg',
      lapsValues: [0, 0, 0, 0, 0, 0],
      isWinner: false,
      isLoser: false,
    });
    const boris = createNewPlayer({
      id: 3,
      name: 'ИВАН',
      imgLink: 'assets/1.jpg',
      lapsValues: [0, 0, 0, 0, 0, 0],
      isWinner: false,
      isLoser: false,
    });
    this.defaultPlayers = [artem, daniil, boris];
  }
}
