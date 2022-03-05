import ReactDOM  from "react-dom";

const App: React.FC = () => {
  return <div>
    <h1> Hi there</h1>
  </div>
}

ReactDOM.render(<App />, document.querySelector('#root'));