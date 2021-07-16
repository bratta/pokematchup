import React from 'react';

/**
 * About - Shows some meta information about how this site is built
 */
export class About extends React.Component {
  render() {
    return (
      <div className="about">
        <h1>About Pokémon Matchup</h1>
        <p>This application is a labor of love to stretch the muscles of modern Javascript development
          with a goal of maintaining minimal dependencies on third-party libraries.
          Here is a list of technologies used in the creation of Pokémon Matchup:</p>
        <ul>
          <li><a href="https://reactjs.org/">React</a> - Javascript framework</li>
          <li><a href="https://reactjs.org/docs/create-a-new-react-app.html">create-react-app</a> - A great tool for bootstrapping a new React webapp.</li>
          <li><a href="https://reactrouter.com/">React Router</a> - A tool for managing routing in React applications</li>
          <li><a href="https://sass-lang.com/">Sass</a> - CSS framework</li>
          <li><a href="https://www.typescriptlang.org/">TypeScript</a> - Typed Javascript</li>
          <li><a href="https://fusejs.io/">Fuse.js</a> - Easy fuzzy searching</li>
          <li><a href="https://fonts.google.com/specimen/Nunito">Google Fonts (Nunito)</a> - I think it looks pretty on mobile</li>
        </ul>
        <p>Most importantly, the goal was to stay away from using larger, older libraries such as jQuery for Javascript
          support, and Bootstrap for UI components. Additionally, there are no server-side components, tracking cookies
          or analytics code. The design is mobile friendly with the intention of quickly pulling up the application as a
          reference while playing the games.
        </p>
        <p>Source code is available <a href="https://github.com/bratta/pokematchup">on Github</a>.</p>
        <p>This code is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.</p>
      </div>
    );
  }
}