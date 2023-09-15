#!/usr/bin/node
const { log: print } = console;
const request = require('request');

const movieID = process.argv[2];

request.get(`https://swapi-api.alx-tools.com/api/films/${movieID}/`, (err, response, body) => {
  if (err) console.log(err)

  body = JSON.parse(body);
  let promiseArray = []
  for (const character_url of body.characters) {
    promiseArray.push(
      new Promise((resolve, reject) => {
        request.get(character_url, (err, response, character_info) => {
          if (err) reject('failure');
          character_info = JSON.parse(character_info);
          resolve(character_info.name);
        });
      })
    );
  }

  Promise.all(promiseArray)
    .then((results) => {
      for (const result of results) {
        print(result)
      }
    });
})
