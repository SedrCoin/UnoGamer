import { Inject, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GameFlowService {
    public resetGameSubj = new Subject<void>();

    private _isGameOn = true;

    public get currentGameStatus(): boolean {
        return this._isGameOn;
    }

    public gameOver(): void {
        this._isGameOn = false;
    }

    public newGame(): void {
        this._isGameOn = true;
    }
}