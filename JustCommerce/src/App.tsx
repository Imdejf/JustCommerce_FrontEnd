import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import React, { useEffect } from "react";
import DefaultSortProvider from "contexts/defaultSortContext";
//import i18n from './_i18n/i18n'
// import { useTranslation } from 'react-i18next';
import AppRouter from "./routing/AppRouter";
import store from "./store/store";
import authService from "services/authServices";
import "react-toastify/dist/ReactToastify.css";

// curl -i -H "Accept:application/json" -H "Content-Type:application/json" -H "Authorization: Bearer ACCESS-TOKEN" -XPOST "https://gorest.co.in/public-api/users" -d '{"name":"Tenali Ramakrishna", "gender":"Male", "email":"tenali.ramakrishna@15ce.com", "status":"Active"}'

function App() {
  // const { t } = useTranslation();

  useEffect(() => {
    //authService.refreshToken();
  }, []);

  return (
    <Provider store={store}>
      <DefaultSortProvider>
        <Router>
          <AppRouter />
        </Router>
        <ToastContainer />
      </DefaultSortProvider>
    </Provider>
  );
}

export default App;
