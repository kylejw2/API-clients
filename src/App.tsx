import React from 'react';
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { request, gql } from 'graphql-request';

const endpoint = 'https://www.mariouniversalis.fr/graphql/';

const queryClient = new QueryClient();

function App() {
  const [gameId, setGameId] = React.useState(-1);

  return (
    <QueryClientProvider client={queryClient}>
      <Games />
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

interface GameType {
  id: string | number;
  name: string;
  image: string;
}

function usePosts(page: number) {
  return useQuery(
    ['games', { page }],
    async () => {
      const { games } = await request(
        endpoint,
        gql`
        query {
          games(page: ${page}) {
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
      `
      );
      return games.data as GameType[];
    },
    { keepPreviousData: false }
  );
}
const Game = ({ gameId }: { gameId: string }) => {
  const [name, setName] = React.useState('');
  const result = useQuery(
    ['game', { page: 1 }, +gameId],
    () => fetch('/games'),
    {
      initialData: () => {
        return (queryClient as any)
          .getQueryData('games')
          ?.find((d: GameType) => d.id === gameId);
      },
    }
  );
  if (result.isError) return null;
  if (result.isLoading) return null;

  if (result.data.name && result.data.name !== name) {
    setName(result.data.name);
  }

  return <div>Your game is: {name}</div>;
};

function Games() {
  const [page, setPage] = React.useState(1);
  const [gameId, setGameId] = React.useState('');
  const { status, data, error, isFetching } = usePosts(
    page
  );
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
          {gameId ? <Game gameId={gameId} /> : null}
        </div>
      </div>
      <h1>Games</h1>
      <div>
        {status === 'loading' ? (
          'Loading...'
        ) : status === 'error' ? (
          <span>Error: {(error as any).message}</span>
        ) : (
          <>
            <div>
              {data &&
                data.map((game) => (
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
                ))}
            </div>
            <div>
              {isFetching ? 'Background Updating...' : ' '}
            </div>
          </>
        )}
      </div>
      <button onClick={() => setPage((prev) => prev + 1)}>
        Load more
      </button>
    </div>
  );
}

export default App;
