import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Nav } from './components/Nav/Nav';
import { Routes, Route } from 'react-router-dom'
import { navElements, PathNav } from './Store/HelperInterface';
import { Home } from './view/Home/Home';

function App() {

  const navigation: navElements[] = [
  {
    path: PathNav.HOME,
  name: 'Home'
},
  {
    path: PathNav.ALL,
    name: 'All Books'
  },
  {
    path: PathNav.ADD,
    name: 'Add Books'
  }
]
  return (
    <div className="App">
      <Nav navElements={navigation} />
      <Routes>
        <Route path='/all' />
        <Route path='/add' />
        <Route path='/' element={<Home/>}/>
        <Route path=':book/:id' />
      </Routes>
    </div>
  );
}

export default App;
