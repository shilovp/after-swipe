import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  
];

export const config: Config = {
  namespace: 'after-swipe',
  globalScript: 'src/assets/flickity/js/flickity.pkgd.min.js',
  globalStyle: 'src/assets/flickity/css/flickity.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    angularOutputTarget({
      componentCorePackage: 'component-library',
      directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings,
    }),
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
     
    },
  ],
};
