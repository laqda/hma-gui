# hma_gui (not maintained)

### An Linux desktop gui for hma-vpn.sh

<br/>

Unofficial [electron](http://electron.atom.io/) gui based on [electron-react-boilerplate](https://github.com/chentsulin/electron-react-boilerplate).

## Screenshots

* Tab Connect

![alt text](screenshots/hma_gui_connect.png "Tab Connect")

* Tab Servers

![alt text](screenshots/hma_gui_servers.png "Tab Servers")

* Tab Settings

![alt text](screenshots/hma_gui_settings.png "Tab Settings")

## Install

* **Note: requires a node version >= 6 and an npm version >= 3.**

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/quentm74/hma_gui.git your-project-name
```

Create a preference file in your personnal folder

```bash
touch ~/.config/Electron/preferences.json
```

And then install dependencies with yarn.

```bash
$ cd your-project-name
$ yarn
```

## Run

For now, only npm run dev is tested. The devtools are disable by default.

```bash
$ npm run dev
```
