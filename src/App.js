import Layout from "./HOC/Layout/Layout";
import Quiz from './containers/Quiz/Quiz'
import { Routes, Route } from "react-router-dom";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import QuizList from "./containers/QuizList/QuizList";
import NotFound from "./containers/NotFound/NotFound";
import Flowers from "./containers/Flowers/Flowers";
import Flower from "./containers/Flower/Flower";
import Login from "./containers/Login/Login";
import Instagram from "./containers/Instagram/Instagram";

import { connect } from 'react-redux'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<QuizList />}></Route>
          <Route path='/quiz/:hash' element={<Quiz />}></Route>
          <Route path='/quiz-creator' element={<QuizCreator />}></Route>
          <Route path='/auth' element={<Auth />}></Route>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/flowers' element={<Flowers />}></Route>
          <Route path='/flowers/:hash1/:hash2' element={<Flower />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/instagram' element={<Instagram />}></Route>
        </Route>
      </Routes>
    </div>
  )
}
function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}
export default connect(mapStateToProps, {})(App)
