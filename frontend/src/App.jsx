import HomePage from './Pages/HomePage'
import CreatePage from "./Pages/CreatePage";
import NoteDetailPage from "./Pages/NoteDetailPage";
import { Route, Routes } from 'react-router-dom';
 
const App = () => {
  return (
    <div data-theme="nord" className='absolute top-0 z-[-2] h-screen w-screen transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,#5E81AC_100%)]'>
      <Routes>
        <Route path= "/" element= {<HomePage /> }/>
        <Route path= "/create" element= {<CreatePage /> }/>
        <Route path= "/note/:id" element= {<NoteDetailPage /> }/>
      </Routes>
      <footer className="footer sm:footer-horizontal footer-center bg-primary/30 text-base-content p-4 sticky">
        <aside>
          <p>Copyright © {new Date().getFullYear()} - All right reserved by Lakshya Sharma</p>
        </aside>
      </footer>
    </div>
  )
}

export default App
 