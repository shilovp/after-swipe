import { Component, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import Flickity from 'flickity';
import { Options } from './options-interface';

@Component({
  tag: 'after-swipe',
  styleUrl: 'after-swipe-component.css',
  shadow: false,
})
export class AfterSwipeComponent {

  private _options: Options;

  @Prop({ mutable: true })
  options: Options | string;

  @Watch('options')
  optionsDataWatcher(newValue: Options | string) {
    if (typeof newValue === 'string') {
      this._options = JSON.parse(newValue);
    }
    else {
      this._options = newValue;
    }
  }

  @Event(
    {
      eventName: 'priceAccepted',
      composed: true,
      cancelable: true,
      bubbles: true,
    }
  ) priceAccepted: EventEmitter<string>;

  currencySign = '$';
  flicky;


  // this is needed to load the external script and put it to head of a hosting app
  // for the some reason global script config in a stencil configuration file does not work as expected
  // seen a lot of issues regarding that on github and stackoverflow
  // this however not ideal but working solution
  componentWillLoad() {
    const src = "https://unpkg.com/flickity@2.2.2/dist/flickity.pkgd.min.js";

    if (document.querySelector(`script[src="${src}"]`)) {
      return; // already exists
    }

    const script = document.createElement('script');
    script.src = src;

    document.head.appendChild(script);
    this.optionsDataWatcher(this.options);
  }

  resolveCurrency() {
    switch (this._options.currency) {
      case 'us-dollar': return '$';
      case 'eu-euro': return '€';
    }
  }

  componentDidRender() {
    console.log('options: ', this._options);
    console.log('options prop: ', this.options);
    this.flicky = new Flickity('.carousel', {
      prevNextButtons: false,
      pageDots: false,
    });

    let index = this._options.prices.indexOf(this._options.currentChoice);
    this.flicky.select(index); // Show current choice price by default. We can also watch input property and update selected value based on that
  }

  acceptNewPrice(price) {
    this.priceAccepted.emit(price);
  }

  render() {
    return <div class={{ 'air': this._options.theme === 'air', 'earth': this._options.theme === 'earth', 'fire': this._options.theme === 'fire', 'aqua': this._options.theme === 'aqua', 'after-container': true }}>
      <div class="carousel"
      >
        {this._options.prices.map((price) => {
          return <div class="carousel-cell">
            <div class="current-choice-header">{price === this._options.currentChoice ? 'Current choice' : ''}</div>
            <div class={{
              'selected-price': price === this._options.currentChoice,
            }}>{price}</div>
            <div>{this.resolveCurrency()} / Month</div>
            <div>
              {price !== this._options.currentChoice ? <a class="accept-price-btn" onClick={() => { this.acceptNewPrice(price) }}>accept</a> : ''}
            </div>
          </div>
        })}
      </div>
    </div>;
  }
}