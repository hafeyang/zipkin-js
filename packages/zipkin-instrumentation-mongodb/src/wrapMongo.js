/* eslint no-param-reassign:0 */
/*
 *  wrap mongo drive with zipkin
 */
// const mongodb = require('mongodb');

const {Annotation} = require('zipkin');

module.exports = (mongodb, {tracer, serviceName = 'mongo'}) => {
  if (!mongodb || !mongodb.Collection.prototype) return;

  function mkZipkinCallback(callback, id) {
    return function zipkinCallback(...args) {
      return tracer.scoped(() => {
        tracer.setId(id);
        tracer.recordAnnotation(new Annotation.ClientRecv());
        return callback.apply(this, args);
      });
    };
  }
  [
    'aggregate',
    'bulkWrite',
    'count',
    'createIndex',
    'createIndexes',
    'deleteMany',
    'deleteOne',
    'distinct',
    'drop',
    'dropAllIndexes',
    'dropIndex',
    'dropIndexes',
    'ensureIndex',
    'find',
    'findAndModify',
    'findAndRemove',
    'findOne',
    'findOneAndDelete',
    'findOneAndReplace',
    'findOneAndUpdate',
    'geoHaystackSearch',
    'geoNear',
    'group',
    'indexes',
    'indexExists',
    'indexInformation',
    'insert',
    'insertMany',
    'insertOne',
    'isCapped',
    'listIndexes',
    'mapReduce',
    'options',
    'reIndex',
    'remove',
    'rename',
    'replaceOne',
    'save',
    'stats',
    'update',
    'updateMany',
    'updateOne',
  ].forEach((method) => {
    const actualFn = mongodb.Collection.prototype[method];
    mongodb.Collection.prototype[method] = function(...args) {
      const callback = args.pop();
      const self = this;
      return tracer.scoped(() => {
        const id = tracer.createChildId();
        tracer.setId(id);
        tracer.recordServiceName(serviceName);
        tracer.recordRpc(method);
        tracer.recordAnnotation(new Annotation.ClientSend());
        tracer.recordBinary('namespace', self.namespace);
        tracer.recordBinary('options.0', JSON.stringify(args[0]));
        if (typeof (args[1]) !== 'function') {
          tracer.recordBinary('options.1', JSON.stringify(args[1]));
        }
        const wrapper = mkZipkinCallback(callback, id);
        const newArgs = [...args, wrapper];
        return actualFn.apply(self, newArgs);
      });
    };
  });
  return mongodb;
};
