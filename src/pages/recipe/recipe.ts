import { ShoppingListPage } from './../shopping-list/shopping-list';
import { RecipesService } from './../../services/recipes';
import { ShoppingListService } from './../../services/shopping-list';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { Recipe } from './../../modals/recipe';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService,
              private recipeService: RecipesService, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredients(){
    this.slService.addItems(this.recipe.ingredients);
    let toast = this.toastCtrl.create({
        message: 'Added succesfully in Shopping List!',
        duration: 1500,
        position: 'top'
    });
    toast.present();

    this.navCtrl.push(ShoppingListPage);
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    let toast = this.toastCtrl.create({
        message: 'Recipe deleted!',
        duration: 2000,
        position: 'top'
    });
    toast.present();
    this.navCtrl.popToRoot();
  }
  
}
