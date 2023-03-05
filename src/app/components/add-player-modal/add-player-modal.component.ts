import { Component, OnInit,  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-player-modal',
  templateUrl: './add-player-modal.component.html',
  styleUrls: ['./add-player-modal.component.css']
})
export class AddPlayerModalComponent implements OnInit {
  public form: FormGroup;
  public imageSrc: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddPlayerModalComponent>,
    private playerService: PlayerService,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [],
      photo: []
    });
  }

  public onAddClick(): void {
    const newPlayerName: string = this.form.value.name as string;
    this.playerService.addPlayer(newPlayerName, this.imageSrc);
    this.dialogRef.close();
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onFileChange(event): void {
    const reader = new FileReader();
    
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
    }
  }
}
