<a id="readme-top"></a>



<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/oneiwon/AutoLog">
    <img src="assets/images/logoBig.png" alt="Logo"height="80">
  </a>

  <h3 align="center">Welcome to AutoLog</h3>

  <p align="center">
   An App for tracking fuel stats using Expo
    <br />
     <br />
    <a href="https://github.com/oneiwon/AutoLog/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/oneiwon/AutoLog/issues/new?labels=bug&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license`

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![React Native][reactnative-shield]][reactnative-url]
* [![Firebase][firebase-shield]][firebase-url]
* [![Expo][expo-shield]][expo-url]
* [![TypeScript][typescript-shield]][typescript-url]
* [![Tailwind CSS][tailwind-shield]][tailwind-url]
* [![AsyncStorage][asyncstorage-shield]][asyncstorage-url]


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* [Node.js](https://nodejs.org/en/download/)
* [Expo CLI](https://docs.expo.dev/get-started/installation/)
  
  ```sh
  npm install -g expo-cli
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/github_username/repo_name.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

1. Firebase setup  
  To connect the app with Firebase, follow these steps: 
    * Go to the [Firebase Console](https://console.firebase.google.com/).
    * Create a new project or select an existing one.
    * Add a new Web App to your project.
    * Copy the Firebase config snippet from the Firebase Console.
    * Create a file named `firebaseConfig.js` in the `src/config/` directory and paste the Firebase config snippet there:

        ```js
        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        export default firebaseConfig;
        ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[reactnative-shield]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[reactnative-url]: https://reactnative.dev/
[firebase-shield]: https://img.shields.io/badge/Firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black
[firebase-url]: https://firebase.google.com/
[expo-shield]: https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white
[expo-url]: https://expo.dev/
[typescript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[typescript-url]: https://www.typescriptlang.org/
[tailwind-shield]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[tailwind-url]: https://tailwindcss.com/
[asyncstorage-shield]: https://img.shields.io/badge/AsyncStorage-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[asyncstorage-url]: https://react-native-async-storage.github.io/async-storage/
