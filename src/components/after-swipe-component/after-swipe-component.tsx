import { Component, h, Prop, Watch } from '@stencil/core';
import Flickity from 'flickity';


@Component({
  tag: 'after-swipe',
  styleUrl: 'after-swipe-component.css',
  shadow: false,
})
export class AfterSwipeComponent {

  @Prop({ mutable: true })
  theme: string = 'aqua';

  @Prop({ mutable: true })
  currency: string = 'us-dollar';

  @Prop({ mutable: true })
  prices = '';

  innerPrices = [];

  @Watch('prices')
  parseData() {
    if (this.prices) {
      this.innerPrices = this.prices.split(',');
    }
  }

  @Prop()
  currentChoice = "-";

  currencySign = '$';

  currentCell = 0;

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


  }

  connectedCallback() {
    this.innerPrices = this.prices.split(',');
    console.log('data? ', this.prices.split(','));
  }

  resolveCurrency() {
    switch (this.currency) {
      case 'us-dollar': return '$';
      case 'eu-euro': return '€';
    }
  }

  componentDidRender() {
    this.flicky = new Flickity('.carousel', {
      prevNextButtons: false,
      pageDots: false,
    });
    
    let index = this.innerPrices.indexOf(this.currentChoice);

    this.flicky.select(index);

    this.flicky.on('change', this.onCellChange);
  }

  onCellChange(index) {
    this.currentCell = index;
    console.log('cell: ', this.currentCell);
  }

  render() {
    return <div class="after-container">
      <div class="carousel"
      >

        {this.innerPrices.map((price, index) => {
          return <div class="carousel-cell">
            <div class="current-choice-header">{price === this.currentChoice ? 'Current choice' : ''}</div>
            <div class={{
              'selected-price': price === this.currentChoice,
            }}>{price}</div>
            <div>{this.resolveCurrency()} / Month</div>
            <div>
              {price !== this.currentChoice ? <a class="accept-price-btn" onClick={() => {this.currentChoice = this.innerPrices[index]; this.flicky.select(index)}}>accept</a> : ''}
            </div>
          </div>
        })}
      </div>
    </div>;
  }
}