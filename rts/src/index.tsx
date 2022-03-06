import ReactDOM  from "react-dom";
import Parent from './props/Parent';
import Container from './usersearch/Container';
const App: React.FC = () => {
  return <div>
    <h1> Hi there</h1>
  </div>
}

ReactDOM.render(<Container />, document.querySelector('#root'));