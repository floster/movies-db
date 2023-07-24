import { useState } from 'react';
import './app.scss'
import AppHeader from './components/AppHeader';
import AppSection from './components/AppSection';
import { MainPageSidebar } from './components/MainPageSidebar';
import data from './data.json'

function App() {
  const [movies] = useState(data.parts);

  return (
    <>
      <AppHeader />
      <div className="l-content m-main_page container">
        <MainPageSidebar movies={movies} />
      </div>
      <AppSection />
    </>
  )
}

export default App
