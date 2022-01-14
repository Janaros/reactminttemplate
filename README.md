## Warning!
The template is in early development, so please do not use it for live operation. Or you will suffer terrible pain.


Manifold Main Contract: 0xdFB4078042254e8093a7ba74DB9316a3d107d4aB

Extension: 0x425616Ea058A02A5F0F580Db60A21f522fF0cFb1

Setup:

1. Paste your contract artifact to utils/ImageNft.json
2. adjust the setup file (constants.jsx)

  const CONTRACT_ADDRESS = 'YOUR EXTENSION CONTRACT';

  const BASE_CONTRACT = 'YOUR MANIFOLD CONTRACT';

  const NFT_IMAGE_URL = 'IMAGE URL';


3.Create a .env file to store your secret keys.

  PUBLIC_KEY=YOUT WALLET ADDRESS




## Running React on Repl.it

[React](https://reactjs.org/) is a popular JavaScript library for building user interfaces.

[Vite](https://vitejs.dev/) is a blazing fast frontend build tool that includes features like Hot Module Reloading (HMR), optimized builds, and TypeScript support out of the box.

Using the two in conjunction is one of the fastest ways to build a web app.

### Getting Started
- Hit run
- Edit [App.jsx](#src/App.jsx) and watch it live update!

By default, Replit runs the `dev` script, but you can configure it by changing the `run` field in the `.replit` file.