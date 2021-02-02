import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';
import PostsScreen from './screens/PostsScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import PostListScreen from './screens/PostListScreen';
import PostEditScreen from './screens/PostEditScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import HealthScreen from './screens/HealthScreen';
import NewsScreen from './screens/NewsScreen';
import StoryScreen from './screens/StoryScreen';
import SportScreen from './screens/SportScreen';

function App() {
  return (
    <Router>
      <main>
        <Header />

        <div className=''>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/health' component={HealthScreen} exact />
          <Route path='/news' component={NewsScreen} exact />
          <Route path='/story' component={StoryScreen} exact />
          <Route path='/sport' component={SportScreen} exact />
          <Route path='/admin/userlist' component={UserListScreen} />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/post/:id' component={PostsScreen} />
          <Route path='/admin/postlist' component={PostListScreen} exact />
          <Route
            path='/admin/postlist/:pageNumber'
            component={PostListScreen}
            exact
          />
          <Route path='/admin/post/:id/edit' component={PostEditScreen} />
          <Route path='/search/:keyword' component={HomeScreen} exact />
          <Route path='/page/:pageNumber' component={HomeScreen} exact />
          <Route
            path='/search/:keyword/page/:pageNumber'
            component={HomeScreen}
            exact
          />
          <Route path='/' component={HomeScreen} exact />
        </div>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
