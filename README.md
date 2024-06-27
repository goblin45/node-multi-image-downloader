# 🧜‍♂️ Node Multiple Image Downloader

A fast and lightweight Node module for downloading images in bulk to local disk from an array of urls or url entries in a column of a .csv file.

## 🔱 Inspiration

While working on some image classification project with deep learning, we felt the lack of such a package which can download plenty of images from entries within a `.csv` file. 📂

📍 Hence, this downloader package was built and till date it supports two types of input ->

1. raw array of image urls 🐛
2. csv file with range of rows and column name specified. 🦋

Let's see how we can use this package to speed up our large image downloading phases.

## 🔱 Installation

```bash
npm install --save multi-image-downloader
```

## 🔱 Options

| Parameter | Requirement | Default Value | Example |
|----------|----------|----------|----------|
| urls | Required, if csv not provided | [ ] | `[ 'https://image1.jpg'`, `'https://image2.jpg', ... ]` |
| targetFolder | Optional | `'./downloads'` | `'./any/folder'` |
| csv | Required, if urls not provided | "" | `'data.csv'` |
| startRow | Optional | 1 | `5` |
| endRow | Optional | -1 | `1000` |
| columnName | Optional | "" | `"image_urls"` |

## 🔱 Usage

Let's see how to build the options two use cases with examples ->

## ⚡ Raw url array

```js
const urls = [
    "https://example.org/image1.jpg",
    "https://example.org/image2.jpg",
    "https://example.org/image3.jpg",
    "https://example.org/image4.jpg",
    .
    .
    .
]

const options = {
    urls,
    targetFolder: './any/folder' // optional
}
```

## 💥 With a CSV file 

```js
const csv = 'data.csv' // an available csv file address
const options = {
    csv,
    startRow: 10, 
    columnName: 1000,
    targetFolder: './any/folder', // optional
}
```

Now we will see how we use this option we just built in other projects.

```js
const multiImageDownloader = require('multi-image-downloader');

// set up options as shown above

multiImageDownloader(options)
```

This will start downloading valid images in the `targetFolder` specified. 

💰 After successful downloading of all the images, it will log

```bash
All images downloaded!
```

in the console.

### Yeayy! We have successfully downloaded all our images and saved a lot of time! ⌛

### Hope you enjoyed this journey. See ya in another doc of some other package! Have a nice day! 🌞