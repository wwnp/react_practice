import Layout from "./HOC/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, Outlet, useParams } from "react-router-dom";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import NotFound from "./containers/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<QuizList />}></Route>
          <Route path='/quiz/:id' element={<Quiz />}></Route>
          <Route path='/quiz-creator' element={<QuizCreator />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Route>
      </Routes>
    </div>
  )
}
export default App
