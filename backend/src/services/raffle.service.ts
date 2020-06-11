import Chance from 'chance';
import Player from '../models/player.model';
import { v4 as uuid } from 'uuid';

function raffle(users: string[]): Player[] {
  
  const chance = raffle._chanceInstance;

  let result: Player[] = [];

  const shuffleUsers = chance.shuffle(users);
  const fights: { [id: string]: { match: Player, count: number } } = {};

  shuffleUsers.forEach(user => {

    const match = {
      name: user,
      id: uuid(),
      fights: []
    };

    result.push(match);
    fights[user] = { match, count: 0 }

  });


  result.forEach(match => {
    const user = match.name;

    let candidates = users
      .filter(x => x !== user)
      .filter(x => fights[x].count < 3);

    let fightsLeft = 3 - fights[user].count;

    const choosen = candidates.length ? chance.pickset(candidates, fightsLeft) : [];

    choosen.forEach(candidate => {

      fights[user].count++;
      fights[user].match.fights.push(candidate);

      fights[candidate].count++;
      fights[candidate].match.fights.push(user);
    });

  })

  return result;

};

raffle._chanceInstance = new Chance();

export default raffle;