# Contract test demo

Contract test is using `https://docs.pact.io/` as test framework.

## How to run

Launch pact brokder by running below command.

```
yarn start:pact
```

Publish pacts to the borker.

```
yarn publish:pacts
```

If it runs successfully, open your `http://localhost:9292` on your browser, it should show the pact `GettingStartedOrderWeb` we just published.

Run below command to verify provider, it should show `1 interaction, 0 failures`.

```
yarn verify:provider
```
