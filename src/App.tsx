import React from 'react';
import './App.css';
import {
  createClient,
  // dedupExchange,
  // fetchExchange,
  Provider,
  useQuery,
} from 'urql';
// import { devtoolsExchange } from '@urql/devtools';
// import { simplePagination } from '@urql/exchange-graphcache/extras';
// import { cacheExchange } from '@urql/exchange-graphcache';

// const cache = cacheExchange({
//   resolvers: {
//     Query: {
//       games: simplePagination(),
//     },
//   },
// });

const client = createClient({
  url: `https://www.mariouniversalis.fr/graphql/`,
  // exchanges: [
  //   devtoolsExchange,
  //   dedupExchange,
  //   cache,
  //   fetchExchange,
  // ],
});

function App() {
  return (
    <Provider value={client}>
      <NintendoGames />
    </Provider>
  );
}

interface GameType {
  id: string | number;
  name: string;
  image: string;
}

const GamesQuery = `
query($page: Int!) {
  games(page: $page) {
    pagination {
      total_count
      total_pages
    }
    data {
      id
      name
      image
    }
  }
}
`;

const NintendoGames = () => {
  const [page, setPage] = React.useState(1);
  const [gameId, setGameId] = React.useState('');
  const [result, reexecuteQuery] = useQuery({
    query: GamesQuery,
    variables: {
      page,
    },
  });
  const { data, fetching, error } = result;

  console.log(data);
  return (
    <div style={{ padding: 30 }}>
      <div style={{ display: 'flex' }}>
        <div>
          <h1>Locate a specific game</h1>
          <input
            value={gameId}
            type='text'
            onChange={(event) =>
              setGameId(event.target.value)
            }
          />
        </div>
        <div>
          {/* {gameId ? <Game gameId={gameId} /> : null} */}
        </div>
      </div>
      <h1>Games</h1>
      <div>
        {fetching ? (
          'Loading...'
        ) : error ? (
          <span>Error: {(error as any).message}</span>
        ) : (
          <>
            <div>
              {data &&
                (data.games.data as GameType[]).map(
                  (game) => (
                    <div
                      style={{ marginBottom: '20px' }}
                      key={game.id}
                    >
                      <p style={{ marginBottom: 0 }}>
                        ID: {game.id}
                      </p>
                      <p style={{ marginTop: 0 }}>
                        Name: {game.name}
                      </p>
                      <img src={game.image} width='200' />
                    </div>
                  )
                )}
            </div>
            <div>
              {fetching ? 'Background Updating...' : ' '}
            </div>
          </>
        )}
      </div>
      <button onClick={() => setPage((prev) => prev + 1)}>
        Load more
      </button>
    </div>
  );
};

const GameQuery = `
query($page: Int!) {
  games(page: $page) {
    pagination {
      total_count
      total_pages
    }
    data {
      id
      name
      image
    }
  }
}
`;

// const Game = ({ gameId }: { gameId: string }) => {
//   // get this game from the cache and not a new api call
//   const [result, reexecuteQuery] = useQuery({
//     query:
//   })
//   return <div>Your game is: </div>;
// };

export default App;
