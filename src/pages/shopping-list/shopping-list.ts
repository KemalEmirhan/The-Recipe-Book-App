import { DatabaseOptionsPage } from './../database-options/database-options';
import { AuthService } from './../../services/auth';
import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";

import { ShoppingListService } from "../../services/shopping-list";
import { Ingredient } from "../../modals/ingredient";
import { PopoverController, LoadingController,AlertController } from "ionic-angular";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html'
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(private serviceShoopingList: ShoppingListService, private popoverCtrl: PopoverController,
              private authService: AuthService, private loadCtrl: LoadingController, private alertCtrl: AlertController,
              ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.serviceShoopingList.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  onCheckItem(index: number){
    this.serviceShoopingList.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent){
    let loading = this.loadCtrl.create({
      content: 'Please wait..'
    });
    let popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        if(data.action == 'store'){
          loading.present();
          this.authService.getActiveUser().getIdToken().then(
            (token: string) => {
                this.serviceShoopingList.storeList(token)
                  .subscribe(
                    () => {
                      loading.dismiss();
                      console.log('Store is OK!');
                      
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                  );
            }
          );
        }else if (data.action == 'load'){
          loading.present();
          this.authService.getActiveUser().getIdToken().then(
            (token: string) => {
              this.serviceShoopingList.fetchList(token)
                .subscribe(
                  (list: Ingredient[]) => {
                      loading.dismiss();
                      if(list){
                        this.listItems = list;
                      }else{
                        this.listItems = [];
                      }
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.json().error);
                    }
                    
                )
            }
          )
        }
      }
    );
  }

  private loadItems() {
    this.listItems = this.serviceShoopingList.getItems();
  }

  private handleError(errorMessage: string){
    let alert = this.alertCtrl.create({
          title: 'Error Fetching Data',
          message: errorMessage,
          buttons: ['OK']
         });
       alert.present();
  }

}

