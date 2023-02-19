# Mini Paint :paintbrush:

This application was created for the development and improvement of the author's skills

![mini-paint](https://user-images.githubusercontent.com/79158730/219965095-dde96f65-d0e1-4ce7-98d1-0c5b13c2a496.png)

![drawing-page](https://user-images.githubusercontent.com/79158730/219965619-4472f9d5-97e3-4164-8f4d-52c30ab85a67.png)

## Task

Here you can find the task :point_right:
https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view

## How to run the app

1. _Clone the repo:_
   `$ git clone https://github.com/KleimyonovVladimir/Innowise-Lab-Internship-Level-2-Mini-paint-.git`
   
2. _Install dependencies:_ `yarn` or `npm install`

3. _Start the dev server:_ `yarn start` or `npm start`

## Database snapshot

In our firebase dataBase we have only one collection - _images_ 

![firebase-store](https://user-images.githubusercontent.com/79158730/219965220-8302069c-0031-460c-b86e-311e843eedba.png)

How you can see, _images_ contains as much _image-item_(document) as we want. Every _images-item_ consists of id and 4 fields: date, title, name and url

Our _canvas images_ we save into firebase storage in folder `images/` 

![firebase-storage](https://user-images.githubusercontent.com/79158730/219965461-d0268e81-2784-4434-8507-e504f15811c3.png)

![firebase-storage-files](https://user-images.githubusercontent.com/79158730/219965478-53a2f26d-21b1-4332-9c0d-7e147efac9be.png)

For work with query in our application were used firebase methods such as `getDoc()`, `deleteDoc()` etc.

**All secret-values located in `.env` file**

Copy the example env file and make the required configuration changes in the .env file

`cp .env.example .env`

## Application stack :memo: 

This is application includes technologies such as: **_SASS, Material UI, Firebase_**.
