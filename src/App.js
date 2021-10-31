import Layout from "./HOC/Layout/Layout";
import Quiz from './containers/quiz/Quiz'

function App() {
  return (
    <div className="App">
      <Layout>
        <Quiz></Quiz>
      </Layout>
    </div>
  )
}
export default App 