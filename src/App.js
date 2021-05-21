// bootstrap and custom
import './styles/styles.scss';

// utility library
import './styles/tailwind.css';

function App() {
  return (
    <div id="content">
      <div className="container card">
        <div className="card-body">
          <div className="tw-py-8">
            <h3>Great App</h3>
            <button className="btn btn-primary">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
