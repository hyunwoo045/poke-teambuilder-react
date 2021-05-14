import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./App.css";
import TeamContainer from "./Components/TeamContainer";

function App() {
  if (localStorage.getItem("sample") === null) {
    localStorage.setItem("sample", JSON.stringify([]));
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
