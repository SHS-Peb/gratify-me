# Gratify Me

Gratify Me is a simple productivity desktop app built with Electron.  
It lets you manage rewards and to-dos with a clean, easy-to-use interface.

---

## Features

- Add, view, and delete rewards
- Add, view, toggle completion, and delete to-dos
- Earn rewards when completing tasks
- Simple modal feedback for achievements
- Lightweight and easy to use

---

## Installation & Running the App (Windows)

To run the Gratify Me app on your Windows computer:

1. **Download the packaged release**  
   Download the latest Windows build from the [Releases](https://github.com/your-username/gratify-me/releases) section (look for `Gratify Me-win32-x64.zip`).

2. **Extract the archive**  
   Unzip the downloaded `.zip` file to a folder, for example:  
   `C:\Program Files\Gratify Me`

3. **Run the app**  
   Open the extracted folder and double-click `Gratify Me.exe` to launch the app.

4. **Create a desktop shortcut (optional)**  
   - Right-click `Gratify Me.exe`  
   - Select **Send to > Desktop (create shortcut)** for easy access.

### Notes

- This build is for **Windows 64-bit** systems only.  
- No need to install Node.js, npm, or any development tools to run the packaged app.  
- If you encounter Windows security warnings, right-click the `.exe` file, select **Properties**, and check **Unblock**.

---

## Running from Source (for Developers)

If you want to run or develop the app from source:

1. Clone this repo:

   ```bash
   git clone https://github.com/your-username/gratify-me.git
   cd gratify-me

2. Install dependencies:

    ```bash
    npm install

1. Start the app:

    ```bash
    npm start

## Project Structure

  main.js - Electron main process code

  renderer.js - Renderer process with UI and logic

  index.html - The app’s HTML layout

  styles.css - App styling

  renderer/icons/ - Icons used in the app

  package.json - Project metadata and scripts

## Technologies Used

  Electron

  JavaScript / HTML / CSS

  Node.js APIs for backend logic
