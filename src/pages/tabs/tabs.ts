import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';

import { ShoppingListPage } from "../shopping-list/shopping-list";
import { RecipesPage } from "../recipes/recipes";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  slPage = ShoppingListPage;
  recipesPage = RecipesPage;
}
