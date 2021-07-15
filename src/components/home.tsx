import React from 'react';

/**
 * Home - Show basic information on using this site
 */
export class Home extends React.Component {
  render() {
    return (
      <div className="home">
        <h1>Pokémon Matchup</h1>
        <p>
          Welcome to <b>Pokémon Matchup</b>! This is a tool designed to help figure out the best 
          counters for a particular Pokémon. Start by searching for a <a href="/by-pokemon">specific Pokémon</a> or
          by searching for <a href="/by-type">individual Pokémon types</a> and the tool will show you which types
          are strong and weak against your choice.
        </p>
        <h2>How To Use This App</h2>
        <p>
          Let's say you are playing <a href="https://www.serebii.net/swordshield/">Pokémon: Sword or Pokémon: Shield</a> and
          you hop into a Max Raid lobby and encounter an unfamiliar Pokémon. For example, you see this:
          <img src="max-raid-lobby-charizard.png" alt="Charizard Max Raid Lobby" title="Charizard Max Raid Lobby" />
          If you didn't know this was a <a href="https://www.serebii.net/pokedex-swsh/charizard/">Charizard</a> raid,
          you are given the hint that it is of the type 
          <span className="inline-pokemon-type fire">Fire</span> and <span className="inline-pokemon-type flying">Flying</span>.
          With that information, you can click on <a href="/by-type">search by type</a>, select those two types,
          and see that Charizard takes 4x Super Effective damage against <span className="inline-pokemon-type rock">Rock</span> 
          type moves, and 2x Super Effective damage against <span className="inline-pokemon-type electric">Electric</span> and
          <span className="inline-pokemon-type water">Water</span> type moves. You can quickly see why people in this raid
          chose <a href="https://www.serebii.net/pokedex-swsh/drednaw/">Dreadnaw</a>, a <span className="inline-pokemon-type rock">Rock</span> and
          <span className="inline-pokemon-type water">Water</span> Pokémon.
        </p>
        <p>
          Alternatively, if you know the name of the Pokémon you are facing, but you don't know what the best moves to use,
          you can <a href="/by-pokemon">search by Pokémon</a> and see the same chart for that Pokémon's types.
        </p>
        <h2>Explanation</h2>
        <p>
          The core Pokémon games contain a total of <b>18 types</b> representing the strengths and weaknesses of each
          Pokémon species. A Pokémon species can have one or two types. Additionally, the moves each Pokémon knows has
          a type as well, and the Pokémon is not limited to knowing moves of their own type. For example, <a href="https://www.serebii.net/pokedex-swsh/pikachu/">Pikachu</a>, a
          pure Electric-type Pokémon, can learn the move <b>Iron Tail</b>, which is
          a <span className="inline-pokemon-type steel">Steel</span>-type move.
        </p>
        <p>
          Moves have fairly logical typings. For example, <span className="inline-pokemon-type fire">Fire</span> is strong against
          <span className="inline-pokemon-type grass">Grass</span>, <span className="inline-pokemon-type water">Water</span> is
          strong against <span className="inline-pokemon-type fire">Fire</span>, and so on. But with 18 types it can get difficult
          to remember the various combinations, especially with the capability of having two types per Pokémon. More detailed information
          about Pokémon types can be found <a href="https://bulbapedia.bulbagarden.net/wiki/Type">on Bulbapedia</a>.
        </p>
        <p>
          <b>NOTE:</b> This application does not take into account the difference in Pokémon in Generation 1 (before
          <span className="inline-pokemon-type dark">Dark</span> and <span className="inline-pokemon-type steel">Steel</span> types
          were added), and pre-Generation 6 before <span className="inline-pokemon-type fairy">Fairy</span> type was added.
          In those cases, you can estimate the damage by searching by types instead of by Pokémon and use the older typing. This
          application also ignores one-off types, such as the <span className="inline-pokemon-type other">???</span> type for the old
          version of the move <b>Curse</b> (pre-Generation 5), and the <span className="inline-pokemon-type other">Shadow</span> type,
          only in <a href="https://www.serebii.net/colosseum/">Pokémon Colosseum</a>, <a href="https://www.serebii.net/xd/">XD: Gales of Darkness</a>,
          and somewhat implemented in <a href="https://pokemongolive.com/en/">Pokémon Go</a>.
        </p>
      </div>
    );
  }
}