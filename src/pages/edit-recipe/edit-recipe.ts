
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, Alert, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators,FormArray } from "@angular/forms";
import { Recipe } from './../../modals/recipe';
import { RecipesService } from './../../services/recipes';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
  mode: string;
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionCtrl: ActionSheetController,
              private alertCtrl: AlertController, private toastCtrl: ToastController, private recipesService: RecipesService) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();
  }

  onSubmit(){
    let value = this.recipeForm.value;
    let ingredients = [];
    if(value.ingredients.length > 0){
      ingredients = value.ingredients.map(name => {
        return {name: name, amount: 1};
      });
    }
    if (this.mode == 'Edit') {
     this.recipesService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients);
    } else {
      this.recipesService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();    
  }

  onManageIngredients(){
    const actionSheet = this.actionCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredients',
          handler: () => { 
            actionSheet.onDidDismiss(() => {
               this.createNewIngredientAlert().present();
            });
          }
        },
        {
          text: 'Remove all Ingredients',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const len = fArray.length;
            if(len > 0){
              for (let i = len-1; i>=0; i--){
                fArray.removeAt(i);
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients deleted!',
                duration: 1000,
                position: 'middle'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }

      ]
    });
    actionSheet.present();
  }
   private createNewIngredientAlert() {
     return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
       buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Clicked');
        }
      },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              const toast = this.toastCtrl.create({
                message: 'Please enter a valid',
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return false;
            }
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
                message: 'Item added!',
                duration: 1000,
                position: 'top'
              });
              toast.present();
          }
        }
      ]
    });
    
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = []; 

    if (this.mode == 'Edit') {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let ingredient of this.recipe.ingredients) {
        ingredients.push(new FormControl(ingredient.name, Validators.required));
      }
    }

    this.recipeForm = new FormGroup({
        'title': new FormControl(title, Validators.required),
        'description': new FormControl(description, Validators.required),
        'difficulty': new FormControl(difficulty, Validators.required),
        'ingredients': new FormArray(ingredients)
    });
  }

}
