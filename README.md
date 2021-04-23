# Dummy Api Exploration

This repo is meant to explore possible solutions for an API layer used in GuideCX Applications.

Each solution can be found on a feature branch within this repo. Here are the current statuses of each networking solution:

`Done`:

- N/A

`In Progress`:

- react-query

`Not Started`:

- Apollo client (control)
- URQL

## Acceptance Criteria

There are a few things that should be explored with each implementation in order for the test to be considered a success;

- how does this solution handle state management/caching?
- will this solution work when there are multiple client apps using it at the same time?
- how does it handle "complicated" features? EG pagination, re-fetching, cache resolution
- can we benefit from typescript types? EG codegen equivalent?
- can we easily configure subscription-like features? EG PubNub, GQL Subscriptions, WebSockets, etc?

## Project Outline

This project is a basic catalog for super mario games. As the test is not to build UI components, all of the UI has been done for all branches.

For each implementation (for to meet all the requirements listed above), the following things should be built:

- [ ] fetch paginated list of games
- [ ] fetch from cache when re-visiting page
- [ ] mutate local cache with game updates
- [ ] access cache from multiple views
- [ ] manually update cache from non-api source
- [ ] use typesafe hooks in a clean, simple API

## Personal Opinion

I'm starting to write this after only 15 minutes of reading URQL docs because I'm seeing plenty of similarities between URQL and Apollo Client. This can be both good and bad. It's good because we're all familiar with Apollo Client but it's bad because few people like Apollo Client. Queries and refetches are almost identical to Apollo Client. Mutations are similar between the two clients. The cache in URQL can be a normalized cache and is represented as a graph. The cache is automatically updated by queries and can be updated by mutations and subscriptions but only if the mutation or subscription returns the entire data object stored on the cache. If they don't have identical properties, we have to manually update the cache. When we create a new entity, we'll have to manually add it to the cache. Exchanges are new and aren't intuitive.

URQL makes me sad.
