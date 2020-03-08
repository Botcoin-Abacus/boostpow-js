# Boost POW Javascript Library
> Boost Proof of Work Protocol
> boostpow.com
>
> Built by MatterPool Inc. (www.matterpool.io)

Boost is a new type of content ranking system that enables users to increase the amount of energy required to mine or process their content. Users will boost their post as a way to signal to the network that they believe their information is valuable. Boosted posts will appear in the boost feed – ordered by the amount of energy requested for their information.

Example Boost Job: https://boostpow.com/job/f2f61baa9b8567b6bad79f6d5d2d627bbc3137d004f7fe4d8d13c2598e5270e1

See usage examples at: https://github.com/MatterPool/boostpow-js/blob/master/test/boost-magic-string.test.js

---

## Quick Start

**Installation**
```sh
npm install boostpow-js --save
```

**Include**
```javascript
// Node
var boost = require('boostpow-js');

```

```html
<!-- Browser -->
<script src="dist/boostpow.js"></script>
<script language="javascript">
    var result = Boost.BoostPowString.fromString('010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991');
    console.log('result', result);
    document.getElementById('results').innerHTML = JSON.stringify(result.toObject());
</script>
```

### Usage examples

See usage at See usage examples at: https://github.com/MatterPool/boostpow-js/blob/master/test/boost-magic-string.test.js

```javascript

// Construct and validate a Boost Pow String
// An exception will be thrown if the Proof of work is invalid or there is anything corrupted

const obj = Boost.BoostPowString.fromString('010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991');
console.log(obj);
/*
{
  hash: '0000000000002917ed80650c6174aac8dfc46f5fe36480aaef682ff6cd83c3ca',
  content: '0000000000000b60bc96a44724fd72daf9b92cf8ad00510b5224c6253ac40095',
  bits: 443192243,
  difficulty: 157416.40184364,
  abstract: "0e60651a9934e8f0decd1c5fde39309e48fca0cd1c84a21ddfde95033762d86c",
  time: 1305200806,
  nonce: 2436437219,
  version: 1,
}
*/

// Retrieve the Boost Hash (aka Bitcoin Blockhash!)
console.log(obj.hash());
// 0000000000002917ed80650c6174aac8dfc46f5fe36480aaef682ff6cd83c3ca

// Construct and validate a Boost Pow String constructed from an object
// An exception will be thrown if the Proof of work is invalid or there is anything corrupted

const obj = Boost.BoostPowString.fromObject({
  content: '0000000000000b60bc96a44724fd72daf9b92cf8ad00510b5224c6253ac40095',
  bits: 443192243,
  abstract: "0e60651a9934e8f0decd1c5fde39309e48fca0cd1c84a21ddfde95033762d86c",
  time: 1305200806,
  nonce: 2436437219,
  version: 1,
});
console.log(obj.toString());
// 010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991


// Construct and validate a Boost Pow String and then get the difficulty
const boostPowString = boost.BoostPowString.fromString('010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991');
const diff = boostPowString.difficulty();
console.log(diff);
// 157416.40184364


// Attempt to just validate proof of work for a Boost Pow String (or Bitcoin Block Header!)
 const isValidPow = boost.BoostPowString.validProofOfWorkFromString('010000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991');
console.log(isValidPow);
// true

 const isValidPow = boost.BoostPowString.validProofOfWorkFromString('a10000009500c43a25c624520b5100adf82cb9f9da72fd2447a496bc600b0000000000006cd862370395dedf1da2841ccda0fc489e3039de5f1ccddef0e834991a65600ea6c8cb4db3936a1ae3143991');
console.log(isValidPow);
// false

```


## Build and Test

```
npm install
npm run build
npm run test
```

-----------

## Any questions or ideas?

matterpool.io

boostpow.com

