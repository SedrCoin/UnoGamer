import { Component, OnInit } from '@angular/core';
import { PlayerModel } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-scheme',
  templateUrl: './scheme.component.html',
  styleUrls: ['./scheme.component.css']
})
export class SchemeComponent implements OnInit {
  public players: PlayerModel[] = [];

  constructor(private playerService: PlayerService) { }

  public ngOnInit(): void {
    this.playerService.playersFlow$
    .asObservable()
    .subscribe((val: PlayerModel[]) => {
      this.players = val;
    });
  }
}
