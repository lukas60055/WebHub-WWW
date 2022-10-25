# Web-Hub.pl - My first page

This is my **first** website design that was created in 2020. Before starting the coding, I created the logo and website design in Adobe XD.

* [scripts.js](src/js/scripts.js) -> Responsible for the proper operation of the entire website.
* [valuation.js](src/js/valuation.js) -> Responsible for the operation of the application form. Among other things, it creates appropriate HTML tags with attributes and text, which it downloads from the JSON file. `[<tag>, {attributes}, <parent>, {<number parent>, <text>}]` JSON files can be created using a script [generator.js](/src/generator/generator.js). It is enough to create any layout in the HTML file that we want to generate, and then enter `download()` in the browser console. Of course, we need to have the generator.js file attached and a solution for saving files in the HTML file we want to generate. In my case, I used FileSaver.

## Technologies Used
* HTML
* CSS/SCSS
* JavaScript/jQuery
* AJAX
* PHP
* JSON
* WebPack
* PostCSS
* Babel JS


## Installation
#### 1. Clone the repo
   ```sh
   git clone https://github.com/lukas60055/WebHub-WWW
   ```
#### 2. Install NPM packages
   ```sh
   npm install
   ```
#### 3. Run application
   ```sh
   npm watch
   ```