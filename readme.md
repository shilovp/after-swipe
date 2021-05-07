# AfterSwipe 🚀

DEMO / Test project. 

## What is the project about ? 

This is responsive web-component built with Stencil which can be used along with Angular, VueJS or React frameworks. And of course from vanilla Javascript.
More about Stencil you can read [here](https://stenciljs.com/).

Component is a simple price picker which can be customized with theme colors, currency and items to display. As a feedback from a component you are getting the price selected by a user, which can be used in a Host application.

Please, check [NPM](https://www.npmjs.com/package/@shilovp/after-swipe) repository as well. 

# API 

## Inputs

Component has an `options` parameter, which has following structure(You can use JSON string as an input or a Typescript object):

`{`
`theme: string,` 
`currency: string,` 
`prices: number[],`
`currentChoice: number`
`}`

### Parameters

- Theme - accepts parameters `aqua | earth | fire | air`
- Currency - accepts two codes `$ | €`
- Prices - accepts an arrya of numbers, example: `[10, 20, 55....]`
- CurrentChoice - accepts number, should be an available option from prices array. 

## Events

Component listen to accept value button and sending back to Host application selected value. 

- priceAccepted - event name. 

You need to have a listener for this event in your host application and refer to event details to get a value (examples bellow)


## Usage example in Vanialla JS: 

- HTML

`<after-swipe id="swiper"></after-swipe>`

- JS (bind data)

`const el = document.getElementById('swiper');`
`var options = { "theme": "aqua", "currency": "us-dollar", "prices": [10, 15, 22, 25, 50, 55, 125, 200, 375, 500, 1500], "currentChoice": 55, "emitOnChange": true }`
`el.setAttribute("options", JSON.stringify(options));`

- JS listen event

`el.addEventListener("priceAccepted", (e) => {`
`options.currentChoice = e.detail; // That is how you cna sync selected price with your host app data`
`el.setAttribute("options", JSON.stringify(options)); // sync back`
`}`

# Setup

## Sanbox / Stencil 

You can setup and run component in a Stencil sandbox to make some changes or investigate functionality. 

To do so you need to have NodeJS and npm installed, preferably latest versions. 
Here is your 3 commands to run: 

`git clone https://github.com/shilovp/after-swipe.git`

Go to `aftr-swipe` folder. 

`npm install`
`npm start`

Application will be started on `localhost:3333`

## Production / Angular

To start using the component from Angular, you need to do following steps: 

1. Install component using npm: 
`npm i @shilovp/after-swipe@1.0.2`

2. Adjust soem setting in your Angular app: 


    Include the `CUSTOM_ELEMENTS_SCHEMA` in the modules that use the components.
    Call `defineCustomElements()` from `main.ts` (or some other appropriate place).

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

```

A component collection built with `Stencil` includes a main function that is used to load the components in the collection. That function is called `defineCustomElements()` and it needs to be called once during the bootstrapping of your application. One convenient place to do this is in `main.ts` as such:

```javascript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Note: loader import location set using "esmLoaderPath" within the output target config
import { defineCustomElements } from '@shilovp/after-swipe/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
defineCustomElements();
```


3. Now you can use it in your application. 

Just use following selector: 

```html 
   <after-swipe id="swiper" (priceAccepted)="onPriceAccepted($event)"></after-swipe>
```

## Production / Vue

1. Install component using npm: 
`npm i @shilovp/after-swipe@1.0.2`


2. Adjust soem setting in your Vue app: 

`main.js`

```javascript


import Vue from 'vue';
import App from './App.vue';

import { applyPolyfills, defineCustomElements } from '@shilovp/after-swipe/loader';

Vue.config.productionTip = false;

// Tell Vue to ignore all components defined in the test-components
// package. The regex assumes all components names are prefixed
// 'test'
Vue.config.ignoredElements = [/test-\w*/];

// Bind the custom elements to the window object
applyPolyfills().then(() => {
  defineCustomElements();
});

new Vue({
  render: h => h(App)
}).$mount('#app');
```

3. Now you can use the component from your Vue component 

```javascript
render() {
  return (
    <div>
      <after-swipe id="swiper" @priceAccepted="onPriceAccepted"></after-swipe>
    </div>
  )
}
```

# DEMO 

You can check live demo [here](https://after-swipe-demo.firebaseapp.com/). Demo implemented using Angular. Component from this project is used there to show some simple use-case.
Deployment is hosted by Firebase.