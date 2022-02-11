## Beat Saber ScoreSaber Widget

Focus was to build it as a BrowserSource for OBS.

License WTFPL - http://www.wtfpl.net/ (short one)

## Main features

You can build it yourself, but quicker way is that you can use version deployed to github pages.
In case if you've linked this widget from github page and it stops working - recheck this place... maybe I had to move stuff around.

(It will automatically refresh your ScoreSaber data each 5min)

* Setup (which is ToDo, atm it will just complain that it is not configured): https://duelsik.github.io/beatsaber-scoresaber-widget/
* Light mode panel: https://duelsik.github.io/beatsaber-scoresaber-widget/?playerId=76561198023909718 (my account is inactive, normally it will show ranks)
* Dark mode panel: https://duelsik.github.io/beatsaber-scoresaber-widget/?playerId=76561198023909718&dark

Just replace number after "playerId=" with your own, and you are good to go. If you want dark mode - just add "&dark" at the end of address.

Your own number you can find by finding yourself on ScoreSaber website and copying long number from the address.
For example mine is https://scoresaber.com/u/76561198023909718

Giving me credits is not expected, but small note in streams About section is always welcome, call me Danielduel in this case.

## Building it yourself

1. Have node (@16) installed.
2. Install packages via running `yarn`
3. Run development server using `yarn start`, it will expose a `localhost:3000`
4. If you want to build a bundle - `yarn build`, the bundle will be in the newly created `build` folder.

## Issues?

Use github issues tracker :)
https://github.com/Duelsik/beatsaber-scoresaber-widget/issues

