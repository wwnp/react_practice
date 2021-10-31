import Layout from "./HOC/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <div style={{border:'1px solid black',width:400,textAlign:'center'}}>
          <h1>Layout</h1>
        </div>
      </Layout>
    </div>
  );
}

export default App 