# Pokémon Matchup

<p align="center">
  <a href="#circleci" alt="Build Status">
    <img src="https://img.shields.io/circleci/build/github/bratta/pokematchup/main?style=for-the-badge&token=cbf16692fc650043053be330963a78e0d4928265" />
  </a>
  <a href="https://github.com/bratta/pokematchup/issues" alt="Issues">
    <img src="https://img.shields.io/github/issues/bratta/pokematchup?style=for-the-badge" />
  </a>
  <a href="https://github.com/bratta/pokematchup/pulls" alt="Pull Requests">
    <img src="https://img.shields.io/github/issues-pr/bratta/pokematchup?style=for-the-badge" />
  </a>
  <a href="https://github.com/bratta/pokematchup/blob/main/LICENSE" alt="License">
    <img src="https://img.shields.io/github/license/bratta/pokematchup?style=for-the-badge" />
  </a>
  <a href="https://twitter.com/docbratta" alt="Follow on Twitter">
    <img src="https://img.shields.io/twitter/follow/docbratta?style=for-the-badge" />
  </a>
</p>

This is the home to Pokémon Matchup, an online web application for figuring out the best Pokémon types to use when facing another Pokémon in any of the core games.

## Using

Each Pokémon has one or two types, indicating its strenths and weaknesses versus other Pokémon and their moves. There are 18 types total in modern Pokémon games, so remembering which ones are strong and weak can get fairly involved. This application is an attempt to solve that problem by providing the ability to look up type matchups. You can look up type matchups by:

* **Searching by Pokémon Type** - You can select one or two types, and the application will calculate which types are super effective, effective, not very effective, or have no effect on your selection.
* **Searching by Pokémon** - You can search by Pokémon if you know the name but not necessarily the typing. It uses a fuzzy search, assisting you in quickly locating the Pokémon you want to check.

## Limitations and Future Goals

This application attempts to give you some suggestions for what to use in battle, but with a limited amount of data we can only provide suggestions based on the raw typings of Pokémon. Ideally, we'd provide more intelligent suggestions based on:

* The game/generation you are playing - Types have been added or changed throughout the years, and some games have different mechanics, such as the `Shadow` type or `???` type for moves like Curse that don't exist in all games.
* Moves and move pools - Pokémon can have moves that do not match their base type. If they use a move with one of their own types you get the benefit of a "same type attack bonus", or STAB for short, but using one of those isn't always the best option in battle. Knowing what moves a Pokémon has access to can mean somethign with crazy typings can end up doing better with the right moves.
* Stats - Not all species are created equal. Some have better or worse base stats.
* IV/EV training - Calculated stats based on IVs and EV training can make a huge difference. 
* Battle items - Items such as Eviolite can make a non-fully evolved Pokémon as good if not better than a fully-evolved Pokémon. For example, in some generations of the game, using a Chansey over its evolution Blissey was often a better option. 

Future goals for this, depending on interest, are:
* Switching to a database backend instead of a flat JSON file
* Allow the user to choose a generation/game
* Provide a team builder or a personal Pokedex for making suggestions based on what you have battle ready

## Contributing

Do you want to contribute? Here's how!

* File an issue - If you see a problem: [Submit an issue](https://github.com/bratta/pokematchup/issues)
* Contribute code - We [accept pull requests](https://github.com/bratta/pokematchup/pulls) as long as tests pass and the changes make sense with the goals of the project.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Running

To run this locally, you will need a few things:

1. Ensure you have [Node.JS](https://nodejs.org/en/) on your system, at least version 14.x.x.
2. Get a comfortable text editor. I use [Visual Studio Code](https://code.visualstudio.com/) along with extensions for ReactJS and Jest.
3. Clone this repository: `git clone https://github.com/bratta/pokematchup.git`
4. Run `npm install` and `npm start` to get the project dependencies and run it locally.

### Available Scripts

In the project directory, you can run:

* `npm install` - Install project dependencies
* `npm start` - Start the application in development mode, on http://localhost:3000
* `npm run test` - Run the unit tests
* `npm run cypress` - Run the end-to-end tests with cypress
* `npm run build` - Build the production site. Output goes into the `build` directory

## License

MIT License

Copyright (c) 2021 Tim Gourley

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.