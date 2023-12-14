import "./App.css";
import AppFooter from "../../Components/Admin/AppFooter";
import AppHeader from "../../Components/Admin/AppHeader";
import PageContent from "../../Components/Admin/PageContent";
import SideMenu from "../../Components/Admin/SideMenu";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="MainContent">
        <SideMenu />
        <PageContent />
      </div>
      <AppFooter />
    </div>
  );
}

export default App;
