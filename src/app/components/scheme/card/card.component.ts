import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlayerModel } from 'src/app/models/player.model';
import { GameFlowService } from 'src/app/services/game-flow.service';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() currentPlayer: PlayerModel;
  public form: FormGroup;

  constructor(
    private playerService: PlayerService,
    private formBuilder: FormBuilder,
    private gameFlowService: GameFlowService
  ) {}

  public ngOnInit(): void {
    this.gameFlowService.resetGameSubj.asObservable().subscribe((data) => {
      this.resetForm();
    });

    this.form = this.formBuilder.group({
      lap1: [],
      lap2: [],
      lap3: [],
      lap4: [],
      lap5: [],
    });

    this.form.valueChanges
    .subscribe((data: unknown) => {
      const numberedArray: number[] = Object.values(data).map(el => Number(el));
      this.currentPlayer.lapsValues = numberedArray;
    });
  }

  public onClickRemove(): void {
    this.playerService.removePlayer(this.currentPlayer.id);
  }

  public resetForm(): void {
    if (this.form) {
      this.form.reset();
    }
  }
}
