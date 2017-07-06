/* eslint-disable no-console */

const htmlStandards = require( 'reshape-standard' );
const cssStandards = require( 'spike-css-standards' );
const jsStandards = require( 'spike-js-standards' );
const pageId = require( 'spike-page-id' );
const env = process.env.NODE_ENV;

const records = require( 'spike-records' );

const locals = {};

let i = 0;
let productData = new Array( 3000 );
for ( ; i < 3000; i++ ) {
  productData[ i ] = i;
}

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.html', css: '*(**/)*.css' },
  ignore: [ '**/layout.html', '**/_*', '**/.*', 'readme.md', 'yarn.lock' ],
  reshape: htmlStandards( {
    parser: false,
    locals: ( ctx ) => {
      return locals;
    },
    minify: env === 'production'
  } ),
  postcss: cssStandards( {
    parser: false,
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  } ),
  babel: jsStandards(),
  plugins: [
    new records( {
      addDataTo: locals,

      product: {
        data: productData,
        template: {
          path: 'views/product.html',
          output: ( data ) => {
            return '/shop/product-' + data + '/index.html';
          }
        }
      }
    } )
  ]
};


