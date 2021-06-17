import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css";
import TeamContainer from "./Components/TeamContainer";

function App() {
  const initialTeam = [
    { title: "Team 1", samples: [] },
    { title: "Team 2", samples: [] },
    { title: "Team 3", samples: [] },
    { title: "Team 4", samples: [] },
    { title: "Team 5", samples: [] },
    { title: "Team 6", samples: [] },
  ];
  if (localStorage.getItem("sample") === null) {
    localStorage.setItem("sample", JSON.stringify([]));
  }
  if (localStorage.getItem("Teamlist") === null) {
    localStorage.setItem("Teamlist", JSON.stringify(initialTeam));
  }

  return (
    <div className="App">
      <Header></Header>
      <TeamContainer></TeamContainer>
      <Footer></Footer>
    </div>
  );
}
export default App;
