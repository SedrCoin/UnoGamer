import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SchemeComponent } from './components/scheme/scheme.component';
import { CardComponent } from './components/scheme/card/card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddPlayerModalComponent } from './components/add-player-modal/add-player-modal.component';
import { Route, RouterModule } from '@angular/router';
import { ClassicGameComponent } from './components/classic-game/classic-game.component';
import { MainComponent } from './components/main/main.component';
import { BaseHeaderComponent } from './components/base-header/base-header.component';

const routes: Route[] = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'classic',
    component: ClassicGameComponent,
  },
  {
    path: 'points',
    component: ClassicGameComponent,
  },
  {
    path: 'secret',
    component: ClassicGameComponent,
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SchemeComponent,
    CardComponent,
    AddPlayerModalComponent,
    ClassicGameComponent,
    MainComponent,
    BaseHeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
