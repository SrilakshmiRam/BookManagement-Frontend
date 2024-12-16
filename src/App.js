import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Home from './components/Home';
import BookDetailsPage from './components/BookDetailsPage';
import BookManagementPage from './components/BookManagementPage';
import NotFound from './components/NotFound';

import './App.css';


const App=()=>(
  <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/book/:id' element={<BookDetailsPage/>} />
        <Route exact path='add/edit' element={<BookManagementPage/>} />
        <Route exact path='*' element={<NotFound/>} />
      </Routes>
  </BrowserRouter>
)

export default App;
