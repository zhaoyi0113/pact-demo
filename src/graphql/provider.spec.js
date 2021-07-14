const { Verifier } = require('@pact-foundation/pact');
const { app } = require('./provider');
const { providerName, pactFile } = require('../pact.js');

let server;

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  beforeAll((done) => {
    server = app.listen(4000, () => {
      done();
    });
  });

  it('validates the expectations of Matching Service', () => {
    // lexical binding required here
    const opts = {
      pactBrokerUrl: 'http://localhost:9292',
      provider: providerName,
      providerBaseUrl: 'http://localhost:4000/graphql',
      providerVersion: '1.0.0',
      publishVerificationResult: true,
      tags: ['prod'],
    };

    return new Verifier(opts)
      .verifyProvider()
      .then((output) => {
        server.close();
      })
      .catch((err) => console.err(err));
  });
});
