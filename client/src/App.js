import './App.css';
import Cards from './pages/Cards';
import Homepage from './pages/homepage';
import Decks from './pages/Decks'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Game from './pages/Game';
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/Game' element={<Game></Game>}></Route>
      <Route path="/Cards" element={<Cards/>}></Route>
      <Route path='/Decks' element={<Decks/>}></Route>
    </Routes>
    </Router>
    </ApolloProvider>
  )
}

export default App;
