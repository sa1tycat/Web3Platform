import "./App.css";
import AppFooter from "../../Components/Alumni/AppFooter";
import AppHeader from "../../Components/Alumni/AppHeader";
import PageContent from "../../Components/Alumni/PageContent";
import SideMenu from "../../Components/Alumni/SideMenu";

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className="SideMenuAndPageContent">
        <SideMenu></SideMenu>
        <PageContent></PageContent>
      </div>
      <AppFooter />
    </div>
  );
}
export default App;
