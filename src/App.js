import "./App.css";
import Header from "./Components/Header";
import Samples from "./Components/Samples/Samples";

function App() {
  const initializedData = [
    { title: "Waiting Box", samples: [], maxLength: 30 },
    { title: "Team 1", samples: [], maxLength: 6 },
    { title: "Team 2", samples: [], maxLength: 6 },
    { title: "Team 3", samples: [], maxLength: 6 },
    { title: "Team 4", samples: [], maxLength: 6 },
    { title: "Team 5", samples: [], maxLength: 6 },
    { title: "Team 6", samples: [], maxLength: 6 },
  ];
  const localSampleData = localStorage.getItem("data-sample");
  if (localSampleData === null) {
    localStorage.setItem("data-sample", JSON.stringify(initializedData));
  }
  return (
    <div id="App">
      <Header></Header>
      <Samples></Samples>
    </div>
  );
}

export default App;
