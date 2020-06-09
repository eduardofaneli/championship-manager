import Chance from 'chance';
import raffle from '../raffle.service';
import Player from '../../models/Player';

const users = [
  "castrolol",
  "faneli",
  "naka",
  "ronam",
  "nelsonLindo",
  "barbieroBaitola",
  "fracasso",
  "shoiti",
  "lucas",
  "vh"
];

beforeEach(function () {
  raffle._chanceInstance = new Chance('teste');
});

test("Deve retornar uma lista de partidas para os usuários", () => {

  const result = raffle(users);

  expect(result[0]).toMatchObject({ name: expect.any(String) })
  expect(result[1]).toMatchObject({ name: expect.any(String) })
  expect(result).toHaveLength(10);
});

test("Garantir que nenhum usuário retornou com partidas repetidas", () => {
  const matches = raffle(users);

  let repeated: string[] = [];

  const result = matches.some(item => {
    if (repeated.includes(item.name)) return true

    repeated.push(item.name);

    return false;
  });

  expect(result).toBeFalsy();

});

test("Deve validar para que cada usuário tenha 3 partidas", () => {
  const result = raffle(users);
  expect(result[0].fights).toHaveLength(3)
  expect(result[5].fights).toHaveLength(3)

  expect(result[5].fights[0]).toStrictEqual(expect.any(String));
  expect(result[5].fights[1]).toStrictEqual(expect.any(String));
  expect(result[5].fights[2]).toStrictEqual(expect.any(String));

});

test("Cada usuário deverá participar de apenas 3 partidas", () => {
  const matches = raffle(users);
  let repeated: { [key: string]: number } = {};

  const result = matches
    .reduce((total: string[], item: Player) => total.concat(item.fights), []) // Junta todos as lutas
    .some(item => {
      if (item in repeated === false) repeated[item] = 0;

      if (repeated[item] >= 3) return true

      repeated[item] += 1;

      return false;
    });

  console.log(repeated);

  expect(result).toBeFalsy();


});

