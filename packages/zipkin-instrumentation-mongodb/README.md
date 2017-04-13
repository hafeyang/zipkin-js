# zipkin-instrumentation-mongodb

Adds Zipkin tracing to the [mongodb](https://www.npmjs.com/package/mongodb) library.
mongodb is native MongoDB NodeJS driver.
so it should also work in [Mongoose](https://www.npmjs.com/package/mongoose)

## WANT YOUR HELP!
currently i have bug unresolved

```
npm run test

```
and you will get console like:

```
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
3361e85a1f3a166f 3361e85a1f3a166f 3361e85a1f3a166f
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
0d00ab2fe8352aca 0d00ab2fe8352aca 0d00ab2fe8352aca
```
traceid spanid parentid was logged

my trace code is `src/wrapMongo.js`
and my test code is `test/integrationTest.js`

the problem is traceId changed , context lost


## Usage

```javascript
```
