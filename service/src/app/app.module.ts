import { LoginPageComponent } from './views/login-page';
import { HomePageComponent } from './views/home-page';
import { routes } from './routes';
import { RouterModule } from '@angular/router';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AngularFireModule, AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
import {persistStore, autoRehydrate} from 'redux-persist';
import {createStore, compose, applyMiddleware} from 'redux';
import { AppComponent } from './views/app.component';
import { NgReduxModule, NgRedux, DevToolsExtension  } from '@angular-redux/store';
import { rootReducer } from './reducers';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
import { Actions } from './actions';
import { initialState, IAppState } from './model';

export const firebaseConfig = {
  apiKey: 'AIzaSyCgw4KZ6T9EfFlsp_Nfn84AuS1YzhWj3z0',
  authDomain: 'getpro-a36da.firebaseapp.com',
  databaseURL: 'https://getpro-a36da.firebaseio.com',
  storageBucket: 'getpro-a36da.appspot.com',
  messagingSenderId: '293833971129'
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Redirect
};

interface Window{
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
}

declare var window: Window;

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpModule,
    FormsModule,
    NgReduxModule,
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent
  ],
  providers: [
    Actions
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  public static angularFire: AngularFire;
  constructor(private appRef: ApplicationRef,
              private af: AngularFire,
              private ngRedux: NgRedux<IAppState>,
              private devTools: DevToolsExtension) {
    AppModule.angularFire = af;
    let enhancers = [];
    if (devTools.isEnabled()) {
      enhancers = [ ...enhancers, devTools.enhancer() ];
    }
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store: any = createStore(
      rootReducer,
      initialState,
      composeEnhancers(
        applyMiddleware(),
        autoRehydrate()
      )
      );
    persistStore(store);

    ngRedux.provideStore(store);
  }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
