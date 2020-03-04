'use strict';
var expect = require('chai').expect;
var index = require('../dist/index.js');

describe('boost #BoostPowJob.createBoostJob', () => {

   it('should be valid minimal', async () => {
      const job = index.BoostPowJob.fromObject({
         content: 'hello world',
         diff: 8,
      });

      const jobObj = job.toObject();
      delete jobObj.time;
      delete jobObj.unique;
      expect(jobObj).to.eql({
         content: Buffer.from('68656c6c6f20776f726c640000000000000000000000000000000000000000000000000000000000000000', 'hex').toString('hex'),
         diff: 8,
         category: 0,
         tag: '0000000000000000000000000000000000000000',
         metadata: "",
         // auto-generated
         // time: 1305200806,
         // unique: 2436437219,
      })
   });

   it('should be valid full', async () => {
      const job = index.BoostPowJob.fromObject({
         content: 'hello world',
         diff: 8,
         // Optional fields below
         category: 1234,
         tag: 'animals',
         metadata: 'metadata here',
         // Optional and auto-generated
         time: 1305200806,
         unique: 2436437219,
      });

      const jobObj = job.toObject();
      expect(jobObj).to.eql({
         content: index.BoostPowJob.createBufferAndPad('hello world', 32).toString('hex'),
         diff: 8,
         category: 1234,
         tag: index.BoostPowJob.createBufferAndPad('animals', 20).toString('hex'),
         metadata: index.BoostPowJob.createBufferAndPad('metadata here', 0).toString('hex'),
         time: 1305200806,
         unique: 2436437219,
      });

      expect(jobObj).to.eql({
         content: '68656c6c6f20776f726c640000000000000000000000000000000000000000000000000000000000000000',
         diff: 8,
         category: 1234,
         tag: '616e696d616c730000000000000000000000000000000000000000',
         metadata: '6d657461646174612068657265',
         time: 1305200806,
         unique: 2436437219,
      });
   });
});
