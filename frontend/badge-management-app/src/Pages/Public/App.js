import "./App.css";
import AppFooter from "../../Components/Public/AppFooter";
import AppHeader from "../../Components/Public/AppHeader";
import PageContent from "../../Components/Public/PageContent";
import SideMenu from "../../Components/Public/SideMenu";

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
