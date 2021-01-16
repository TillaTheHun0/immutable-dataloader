
# immutable-dataloader

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![TypeScript](https://camo.githubusercontent.com/21132e0838961fbecb75077042aa9b15bc0bf6f9/68747470733a2f2f62616467656e2e6e65742f62616467652f4275696c74253230576974682f547970655363726970742f626c7565)](https://www.typescriptlang.org/)

[dataloader](https://github.com/graphql/dataloader), but calls to `load()` return new copies of the data, every time

_Note:_ This doesn't mean that data is reloaded from the data source, just that each call to `load()` or `loadMany()` returns a new copy of the data.

## Install

```bash
npm i immutable-dataloader
OR
yarn add immutable-dataloader
```

## How to use

This is meant to be a drop in replacement for `dataloader`, thus usage is identical to [dataloader](https://github.com/graphql/dataloader#getting-started)

```js
import DataLoader from 'immutable-dataloader'

const dataloader = new DataLoader(...)
```

## Why

It may be desirable to manipulate data returned from a `dataloader` ie.

```js
const res = await dataloader.load(1)

res.foo = 'bar'

// or an array
const resArray = await dataloader.load(2) // ['foo']

const lastItem = resArray.pop() // mututes the array
```

Because the data returned from the dataloader was directly mutated, subsequent calls to `load`, will return that cached, but same _mutated_, data:

```js
const resArray = await dataloader.load(2) // [] 'foo' was removed by the last pop() call

const lastItem = resArray.pop() // array is empty, so lastItem is now undefined
```

Depending on the order or the calls to `load`, this can cause some funky gotchas, and bugs that are difficult to trace.

With `immutable-dataloader`, each call to `load` or `loadMany` **returns a new _copy_ of the data**, so this whole class of bugs is removed.

## License

MIT
