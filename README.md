# Atelier [![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

## Overview

- Atelier is an e-commerce web application that renders product information (from an external API) into a modern user-friendly interface.

- Users are able to browse items, select different styles, choose sizes and quantities, read/post reviews, and ask questions about products.

## Table of Contents

1. [Usage](#Usage)
1. [Technologies](#Technologies)
1. [Features](#Features)
1. [Contributions](#Contributions)
1. [License](#License)

## Usage

1. Install all dependencies by running `npm install` in the root directory of the application
2. Create a copy of the "config.example.js" file and paste it in the same path (/server/config) and name it "config.js"
3. Create your own unique API key and paste the key in the newly created config.js file where noted
4. Run the following commands in separte terminals:
```
npm start
npm run build
```
5. Open up localhost:3001 in the browser


## Technologies

This web app was created using the following:

- Node v14.17.0
- React v17.0.2
- Express v4.17.1
- Webpack v5.39.0
- React Bootstrap v1.6.1
- Swiper v6.7.0
- Babel v7.14.6

## Features

![](client/src/assets/atelier.gif)

- Product information is provided through an external RESTful API, which requires a unique read-only individual key to access the information
- Users are able to view the selection of products on the top navigation bar
- On an item page, users can browse through images using the image carousel. Selection of the main image will result in a modal window that will enable users to zoom in on the image of interest.
- Each product has different styles, with certain styles having different prices (including some on sale)
- Selection of a size will render available quantities
- Users are able to view questions regarding the product of interest, submit new questions, and answer existing ones
- Users are able to seeing existing reviews of items (if there are any). They can also rate and review items themselves
- Questions and reviews

## Contributions

- Austin Yeon worked primarily on the product overview sections, including the images, styles, sizes, quantities, descriptions, features, social media sharing, etc.

- Raelyn Cheung Sutton worked primarily on the questions and answers portion of the web app, including the ability to ask new questions and answer current ones.

- Scott Hansen worked primarily on the ratings and reviews portion, including the rendering of stars and ability to submit new reviews.

## License

Distributed under the ISC license.
