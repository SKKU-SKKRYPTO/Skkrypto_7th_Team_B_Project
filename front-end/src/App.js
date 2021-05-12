import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Article from './components/Article';
import Author from './components/Author';
import Guide from './components/Guide';
import Login from './components/Login';
import Main from './components/Main';
import MyPage from './components/MyPage';
import NFTGallery from './components/NFTGallery';
import Upload from './components/Upload';

const App = () => {
  return (
    <Router>
      <Route path="/" exact={true}>
        <Main />
      </Route>
      <Route path="/mypage" exact={true}>
        <MyPage />
      </Route>
      <Route path="/login" exact={true}>
        <Login />
      </Route>
      <Route path="/nftgallery" exact={true}>
        <NFTGallery />
      </Route>
      <Route path="/guide" exact={true}>
        <Guide />
      </Route>
      <Route path="/author" exact={true}>
        <Author />
      </Route>
      <Route path="/upload" exact={true}>
        <Upload />
      </Route>
      <Route path="/article" exact={true}>
        <Article />
      </Route>
    </Router>
  );
};

export default App;
