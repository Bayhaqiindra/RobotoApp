import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Grommet, Main, ThemeType } from 'grommet';
import theme from '../theme';
import Menu from './screens/Menu';
import Level from './screens/Level';

const LevelSelection = lazy(() => import('./screens/LevelSelection'));
const Settings = lazy(() => import('./screens/Settings'));

// Debug component untuk melihat route yang aktif
const RouteDebugger: React.FC = () => {
  const location = useLocation();
  console.log('🗺️ Current route:', location.pathname);
  return null;
};

const App: React.FC = () => {
  console.log('🚀 App component rendered');
  
  return (
    <BrowserRouter>
      <RouteDebugger />
      <Grommet full theme={theme as ThemeType}>
        <Main align="center">
          <Suspense fallback={
            <div style={{ color: 'white', padding: '20px', textAlign: 'center' }}>
              <h2>Loading...</h2>
            </div>
          }>
            <Switch>
              <Route exact path="/">
                {() => {
                  console.log('📍 Rendering Menu route');
                  return <Menu />;
                }}
              </Route>
              
              <Route path="/settings">
                {() => {
                  console.log('📍 Rendering Settings route');
                  return <Settings />;
                }}
              </Route>
              
              <Route path="/select-level">
                {() => {
                  console.log('📍 Rendering LevelSelection route');
                  return <LevelSelection />;
                }}
              </Route>
              
              <Route path="/level/:level">
                {() => {
                  console.log('📍 Rendering Level route');
                  return <Level />;
                }}
              </Route>
              
              <Route>
                {() => {
                  console.log('📍 No match, redirecting to /');
                  return <Redirect to="/" />;
                }}
              </Route>
            </Switch>
          </Suspense>
        </Main>
      </Grommet>
    </BrowserRouter>
  );
};

export default App;