const Verifier = require('@pact-foundation/pact').Verifier;
const getPort = require('get-port');
const { server } = require('./provider.js');
const { providerName, pactFile } = require('../pact.js');
let port;
let opts;

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
	let app;
  beforeAll(async () => {
    port = await getPort();
    opts = {
      provider: providerName,
      providerBaseUrl: `http://localhost:${port}`,
      pactBrokerUrl: 'http://localhost:9292',
      publishVerificationResult: true,
      tags: ['prod'],
      providerVersion: '1.0.0',
    };

    app = server.listen(port, () => {
      console.log(`Provider service listening on http://localhost:${port}`);
    });
  });
  it('should validate the expectations of Order Web', () => {
    return new Verifier()
      .verifyProvider(opts)
      .then((output) => {
        console.log('Pact Verification Complete!');
        console.log(output);
      })
      .catch((e) => {
        console.error('Pact verification failed :(', e);
      });
  });

  afterAll(() => app.close());
});
