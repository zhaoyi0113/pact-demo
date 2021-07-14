# Contract test demo

Contract test is using `https://docs.pact.io/` as test framework.

## How to run

Launch pact brokder by running below command.

```
yarn start:pact
```


### REST API Demo

Consumer publish pacts to the borker.

```
yarn publish:pacts
```

If it runs successfully, open your `http://localhost:9292` on your browser, it should show the pact `GettingStartedOrderWeb` we just published.

Run below command to verify pacts from provider, it should show `1 interaction, 0 failures`.

```
yarn verify:pacts
```

## Graphql Demo

There is a `graphql` example in the code, you can run the similar command to test graphql pacts:

```
yarn publish:graphql:pacts
yarn verify:graphql:pacts
```
