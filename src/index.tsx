import ReactDOM from 'react-dom';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import App from './App';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <FirebaseProvider>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/app/inicio" />
                    </Route>
                    <Route path="/app" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/registro" component={Registro} />
                </Switch>
            </FirebaseProvider>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
