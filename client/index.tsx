import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rest/restTVProgram';
import reducer from './reducers/reducer';
import SMS from './containers/app';


require("babel-polyfill");
require('whatwg-fetch');

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  applyMiddleware(
    sagaMiddleware
  )
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
       <SMS />
    </Provider>,
    document.getElementById('app'),
  )
