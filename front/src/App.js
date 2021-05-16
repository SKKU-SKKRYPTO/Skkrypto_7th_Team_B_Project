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
      <Route path="/" exact={true} component={Main} />
      <Route path="/mypage" exact={true} component={MyPage} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/nftgallery" exact={true} component={NFTGallery} />
      <Route path="/guide" exact={true} component={Guide} />
      <Route path="/author" exact={true} component={Author} />
      <Route path="/upload" exact={true} component={Upload} />
      <Route path="/article" exact={true} component={Article} />
    </Router>
  );
};

export default App;
