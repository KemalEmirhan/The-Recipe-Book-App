import { DatabaseOptionsPage } from './../pages/database-options/database-options';
import { AuthService } from './../services/auth';
import { SignupPage } from './../pages/signup/signup';
import { SigninPage } from './../pages/signin/signin';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { EditRecipePage } from './../pages/edit-recipe/edit-recipe';
import { RecipesPage } from './../pages/recipes/recipes';
import { RecipePage } from './../pages/recipe/recipe';
import { TabsPage } from './../pages/tabs/tabs';
import { ShoppingListPage } from './../pages/shopping-list/shopping-list';
import { ShoppingListService } from './../services/shopping-list';
import { RecipesService } from './../services/recipes';
import { HttpModule } from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    TabsPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    TabsPage,
    RecipePage,
    RecipesPage,
    EditRecipePage,
    SigninPage,
    SignupPage,
    DatabaseOptionsPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingListService,
    RecipesService,
    AuthService
  ]
})
export class AppModule {}
