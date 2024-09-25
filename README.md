# Mintlify Take-Home Challenge

This repository contains the take-home assignment I completed for Mintlify.

## Running the Application Locally

To run the app locally, follow these steps:

1. Install dependencies: `npm i`
2. Build the project: `npm run build`
3. Start the application: `npm run start`

[Click here to view the live application](https://mintlify-new-app-for-takehome.vercel.app/)

## Project Workflow

During the project, I followed a structured approach to ensure a smooth and efficient development process. Although the instructions allowed flexibility in the task order, I found that completing the steps in order made the most sense.

1. **Setting up the project**: I initialized a Next.js app and confirmed that the components were rendered correctly on the main page.
2. **Rendering the image**: Before processing the image, I verified that the [URL](https://mintlify-assets.b-cdn.net/interview/base64.txt) was valid. To achieve this, I used a `fetch` request and then set the image source with `` setImageSrc(\`data:image/png;base64,${base64}\`); ``.
3. **Logging pixel data**: I ensured that the pixel coordinates were logged correctly to track image data.
4. **Handling binary data**: Next, I logged the binary data to confirm its accuracy before rendering.
5. **Debugging**: I used `console.log()` to verify that the data was being correctly processed before displaying it on the screen.
6. **Displaying the output**: Once I confirmed the data was correct, I displayed the full script on the screen.

## Challenges and Solutions

One issue I encountered was a crash caused by storing binary data in `binaryArray` using `useState()`. The issue arose due to excessive re-renders caused by frequent updates to the state. To resolve this, I switched to using a standard array and utilized the `push()` method to append items one at a time, avoiding unnecessary re-renders caused by state updates.
