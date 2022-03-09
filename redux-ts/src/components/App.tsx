import { Provider } from "react-redux";
import { store } from "../state";
import RepositoriesList from './RepositoriesList'

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Search For aPackage</h1>
        <RepositoriesList />
      </div>
    </Provider>
  ) 
}

export default App;