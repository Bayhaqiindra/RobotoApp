import React, { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Grommet, Main, ThemeType } from 'grommet';
import theme from '../theme';
import { configureStore } from '../state';
import Menu from './screens/Menu';

// Lazy loading tetap aman di v5
const Level = lazy(() => import('./screens/Level'));
const LevelSelection = lazy(() => import('./screens/LevelSelection'));
const Settings = lazy(() => import('./screens/Settings'));

const { store } = configureStore();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Grommet full theme={theme as ThemeType}>
          <Main align="center">
            <Suspense fallback={<div>Loading...</div>}>
              {/* v5 menggunakan Switch, bukan Routes */}
              <Switch>
                {/* v5 menggunakan prop 'component' atau children, bukan 'element' */}
                <Route exact path="/" component={Menu} />
                <Route path="/settings" component={Settings} />
                <Route path="/select-level" component={LevelSelection} />
                <Route path="/level/:level" component={Level} />
                
                {/* v5 menggunakan Redirect, bukan Navigate */}
                <Redirect to="/" />
              </Switch>
            </Suspense>
          </Main>
        </Grommet>
      </BrowserRouter>
    </Provider>
  );
};

export default App;