# THE SOUND PLAYER

This is an React-native project using [Expo](https://expo.dev) created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

The Sound Player is a school project for four WebDev students. It uses the [Freesound API](https://freesound.org/docs/api/resources_apiv2.html#user-sounds) which really is a collection of random sound.
You want to listen to:

- a cat flap opening and closing : you can!
- a cool 30 second techno loop : you can!
- a Bob Marley cover (copyright 🤷‍♂️) : you can!
- etc.

You'll probably find what you're looking for.

This is a school project not meant for production as is. The use of multiple AudioPlayer causes some efficency issues. These were ignored as our goal with the project was to manage sound on a mobile device.

**You will need your own freesound API key to make this project work.**
We've used our API keys publicly in earlier version of this app for simplicity but you should keep your API key in a separate file in your .gitignore.
Earlier published API keys have been removed from our FreeSound accounts.

## TABS

### HOME

Render a search bar and five sound suggestions you can listen to (only play/pause).

### Music Player

Clicking on the song-title/artist-name of a sound suggestion sends your to the Music Player. Here you can also skip fwd/bwd or go to the start/end of the song.
If a sound is playing in Home or Search, pressing the Music Player icon will show you the active song.

### Search

Search a sound and play it in the rendered sound results.

### About

Quick description of the team. We don't take ourselves too seriously.

## Useage:

You might need to install the following expo dependency:

```bash
npx expo install expo-audio
```
