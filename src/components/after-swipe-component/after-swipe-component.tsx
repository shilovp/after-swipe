import { Component, h } from '@stencil/core';

@Component({
  tag: 'after-swipe',
  styleUrl: 'after-swipe-component.css',
  shadow: false,
})
export class AfterSwipeComponent {

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

    console.log('document ref: ', script);
  }

  connectedCallback() {
    
  }

  render() {
    return <div>
      <div class="carousel"
        data-flickity='{ "wrapAround": true }'>
        <div class="carousel-cell">1</div>
        <div class="carousel-cell">2</div>
        <div class="carousel-cell">3</div>
        <div class="carousel-cell">4</div>
        <div class="carousel-cell">5</div>
      </div>

    </div>;
  }
}