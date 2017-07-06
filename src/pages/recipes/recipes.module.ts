import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesPage } from './recipes';

@NgModule({
  declarations: [
    RecipesPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipesPage),
  ],
  exports: [
    RecipesPage
  ]
})
export class RecipesPageModule {}
