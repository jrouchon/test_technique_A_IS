import './App.css';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Home from './pages/Home';

const queryClient = new QueryClient()

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <Home />
        </div>
      </QueryClientProvider>
    </div>

  );
}

export default App;
