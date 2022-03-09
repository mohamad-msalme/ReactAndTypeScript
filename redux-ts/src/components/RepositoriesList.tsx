import React, {useState} from "react";
import { useAction, useSelector} from "../hooks/";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const { SearchRepositires } = useAction();
  const {loading, data, error } = useSelector((state) => state.repositires);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    term && SearchRepositires(term);
  }
  const renderResult = () => {
    const renderPackagesList = () => data.map((item)=> (<li key={item}>{item}</li>));
    const rederError = () => <h3>error</h3>;
    const renderLoading = () => <h3>Loading...</h3>
    if (data) {
      return renderPackagesList();
    } else if (loading) {
      return renderLoading();
    } else if (!loading && error) {
      return rederError();
    } else {
      return <h3>No Result found</h3>;
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>
      {renderResult()}
    </div>
  )
}

export default RepositoriesList;