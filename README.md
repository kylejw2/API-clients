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
- - Very well. React Query handles background fetching, inactive queries, and garbage collection. All of this is well documented [here](https://react-query.tanstack.com/guides/caching).
- will this solution work when there are multiple client apps using it at the same time?
- - Not sure. I couldn't find official documentation related to this question.
- how does it handle "complicated" features? EG pagination, re-fetching, cache resolution
- - Very well. Paginating is well-documented and includes options to keep already fetched data which makes the UI seem seamless. React Query handles auto refetching on specific window events. React Query also provides easy hooks to modify already triggering events or create new events that trigger a refetch. When it comes to a simple `refetch` method that can be called whenever we decide, React Query fails to provide it.
- can we benefit from typescript types? EG codegen equivalent?
- - Compatible with typescript. Briefly skimmed over [this](https://blog.logrocket.com/making-graphql-requests-easy-with-react-typescript-and-react-query/) so codegen seems possible.
- can we easily configure subscription-like features? EG PubNub, GQL Subscriptions, WebSockets, etc?
- - Not easily. React Query almost had a subscription hook but the founder said that they're no longer pursuing it. According to [his comments](https://github.com/tannerlinsley/react-query/issues/171), to have subscription-like behavior, we'll need to create that functionality ourselves.

## Project Outline

This project is a basic catalog for super mario games. As the test is not to build UI components, all of the UI has been done for all branches.

For each implementation (for to meet all the requirements listed above), the following things should be built:

- [x] fetch paginated list of games
- [ ] fetch from cache when re-visiting page
- [ ] mutate local cache with game updates
- [ ] access cache from multiple views
- [ ] manually update cache from non-api source
- [x] use typesafe hooks in a clean, simple API

## Personal Opinion

I've spent one whole day on React Query and I feel extremely familiar with it. It doesn't have a steep learning curve. The library works well with things that we need, such as codegen, typescript, paginated queries, and cache access and management. The built in devtools provide a nice touch to seeing the cache and knowing which queries are being managed, fetched, refetched, etc. The window event listeners are neat and would help some of our customers because I've heard that some have multiple sessions of the app open at once. Default React Query features would auto refetch data in the background of the application so our customers would be getting the most recent data without having to refresh their page.
