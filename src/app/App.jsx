import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';

import { NavBar } from '@/components';
import { Home, About } from '@/pages'
import { store } from './store';

import '@/assets/css/fonts.css';
import '@/assets/css/layout.css';
import '@/assets/css/home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {

  return (
    <Provider store={store}>
      <div className="d-flex">
        <HashRouter>
          <div className="d-flex flex-column flex-grow-1 content">
            <NavBar />
            <div className="main-wrapper">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
          </div>
        </HashRouter>
      </div>
    </Provider>
  );
}
