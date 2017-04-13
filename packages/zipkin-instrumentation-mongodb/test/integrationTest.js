/* eslint prefer-arrow-callback:0*/
const {Tracer, ExplicitContext} = require('zipkin');
const sinon = require('sinon');
const wrapMongo = require('../src/wrapMongo');
const originMongoDb = require('mongodb');
// const CLSContext = require('zipkin-context-cls');


describe('mongodb instrumentation - should traced', () => {
  before(() => {
  });

  let record;
  let recorder;
  let ctxImpl;
  let tracer;
  beforeEach(() => {
    record = sinon.spy();
    recorder = {record};
    ctxImpl = new ExplicitContext();
    tracer = new Tracer({recorder, ctxImpl});
  });

  it('should intercepted', done => {
    const mongodb = wrapMongo(originMongoDb, {tracer});
    const MongoClient = mongodb.MongoClient;
    const ctx = ctxImpl.getContext();
    ctxImpl.letContext(ctx, () => {
      const url = 'mongodb://localhost:27017/zipkin_test';
      MongoClient.connect(url, function(err, db) {
        const col = db.collection('somecollection');
        ctxImpl.letContext(ctx, () => {
          col.deleteMany({}, {}, function() {
            ctxImpl.letContext(ctx, () => {
              col.insertMany([{a: 1}, {a: 2}, {a: 3}], function() {
                db.close();
                const annotations = record.args.map(args => args[0]);
                annotations.forEach(a => console.log(a.traceId.traceId+" "+a.traceId.spanId+" "+a.traceId.parentId));
                console.log(annotations);
                done();
              });
            });
          });
        });
      });
    });
  });
});

