import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayerComponent } from '../player/player.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations:[PlayerComponent],
  exports:[PlayerComponent]
})
export class PlayerModule {

}
