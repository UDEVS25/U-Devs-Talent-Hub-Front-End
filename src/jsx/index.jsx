import React, { useContext } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Nav2 from "./layouts/nav/index2";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

/// Dashboard
import Home from "./components/Dashboard/Home";









/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import PostDetails from "./components/AppsMenu/AppProfile/PostDetails";
import EditProfile from "./components/AppsMenu/AppProfile/EditProfile";
import Calendar from "./components/AppsMenu/Calendar/Calendar";








/// Pages
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";
import { ThemeContext } from "../context/ThemeContext";

const Markup = () => {
  const routhPath = [
    { url: "finance", component: <Finance /> },
    { url: "student", component: <Students /> },
    { url: "student-detail", component: <StudentDetails /> },
    { url: "add-student", component: <AddNewStudent /> },
    { url: "teacher", component: <Teachers /> },
    { url: "teacher-detail", component: <TeachersDetail /> },
    { url: "add-teacher", component: <AddNewTeacher /> },
    { url: "food", component: <Food /> },
    { url: "food-details", component: <FoodDetails /> },
    { url: "user", component: <User /> },
    { url: "activity", component: <Activity /> },
    { url: "calendar", component: <HomeCalendar /> },
    //App Profile
    { url: "app-profile", component: <AppProfile /> },
    { url: "post-details", component: <PostDetails /> },
    { url: "edit-profile", component: <EditProfile /> },
    { url: "app-calender", component: <Calendar /> },
    //App -> shops
    { url: "ecom-product-grid", component: <ProductGrid /> },
    { url: "ecom-product-list", component: <ProductList /> },
    { url: "ecom-product-detail", component: <ProductDetail /> },
    { url: "ecom-product-order", component: <ProductOrder /> },
    { url: "ecom-checkout", component: <Checkout /> },
    { url: "ecom-invoice", component: <Invoice /> },
    { url: "ecom-customers", component: <Customers /> },
    //Charts
    { url: "chart-apexchart", component: <ApexChart /> },
    { url: "chart-rechart", component: <RechartJs /> },
    { url: "chart-chartjs", component: <ChartJs /> },
    { url: "chart-sparkline", component: <SparklineChart /> },

    //bootstrap
    { url: "ui-modal", component: <UiModal /> },
    { url: 'ui-popover', component: <UiPopOver /> },
    { url: "ui-typography", component: <UiTypography /> },
    { url: "ui-grid", component: <UiGrid /> },

    //Plugins
    { url: "uc-select2", component: <Select2 /> },
    { url: "uc-noui-slider", component: <MainNouiSlider /> },
    { url: "uc-toastr", component: <Toastr /> },
    { url: "uc-lightgallery", component: <Lightgallery /> },
    { url: "uc-sweetalert", component: <MainSweetAlert /> },
    { url: "form-element", component: <Element /> },
    { url: "form-wizard", component: <Wizard /> },
    { url: "form-ckeditor", component: <CkEditor /> },
    { url: "form-validation", component: <FormValidation /> },
    //widget
    { url: "widget", component: <Widget /> },
    /// table
    { url: 'table-filtering', component: <FilteringTable /> },
    { url: 'table-sorting', component: <SortingTable /> },
    { url: "table-bootstrap-basic", component: <BootstrapTable /> },
    { url: "form-pickers", component: <Pickers /> },

  ]
  const routhPath2 = [
    //Bootstrap
    { url: "ui-accordion", component: <UiAccordion /> },
    { url: "ui-alert", component: <UiAlert /> },
    { url: "ui-badge", component: <UiBadge /> },
    { url: "ui-button", component: <UiButton /> },
    { url: "ui-button-group", component: <UiButtonGroup /> },
    { url: "ui-list-group", component: <UiListGroup /> },
    { url: "ui-card", component: <UiCards /> },
    { url: '/ui-carousel', component: <UiCarousel /> },
    { url: '/ui-dropdown', component: <UiDropDown /> },
    { url: '/ui-progressbar', component: <UiProgressBar /> },
    { url: '/ui-tab', component: <UiTab /> },
    { url: '/ui-pagination', component: <UiPagination /> },
  ];

  return (
    <>
      <Routes>
        <Route path='/page-error-400' element={<Error400 />} />
        <Route path='/page-error-403' element={<Error403 />} />
        <Route path='/page-error-404' element={<Error404 />} />
        <Route path='/page-error-500' element={<Error500 />} />
        <Route path='/page-error-503' element={<Error503 />} />
        <Route path='/page-lock-screen' element={<LockScreen />} />
        <Route element={<Layout1 />}>
          <Route path='/' exact element={<Home />} />
          <Route path='/dashboard' exact element={<Home />} />
          <Route path='/dashboard-dark' exact element={<DashboardDark />} />         
        </Route>
        <Route element={<Layout2 />}>
          {routhPath.map((data, i) => (
            <Route key={i} exact path={`/${data.url}`} element={data.component} />
          ))}
        </Route>

        <Route element={<Layout5 />}>
          <Route path='/file-manager' exact element={<FileManager />} />
          <Route path='/chat' exact element={<FileChat />} />
          <Route path='/email-compose' exact element={<Compose />} />
          <Route path='/email-inbox' exact element={<Inbox />} />
          <Route path='/email-read' exact element={<Read />} />
        </Route>
        <Route element={<Layout6 />}>
          {routhPath2.map((data, i) => (
            <Route key={i} exact path={`/${data.url}`} element={data.component} />
          ))}
        </Route>
      </Routes>      
      <ScrollToTop />
    </>
  );
};

function Layout1() {
  const { sidebariconHover } = useContext(ThemeContext);
  const sideMenu = useSelector(state => state.sideMenu);
  let windowsize = window.innerWidth;
  return (
    <div id="main-wrapper" className={` show  ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
      <div className={`wallet-open  ${windowsize > 1199 ? 'active' : ''}`}>
        <Nav2 />
        <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
          <div className="container-fluid">
            <Outlet />
          </div>
        </div>
        <Footer changeFooter="footer-outer" />
        <WalletBar />
      </div>
    </div>

  )
}

function Layout2() {
  const sideMenu = useSelector(state => state.sideMenu);
  const { sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body" style={{ minHeight: window.screen.height + 20 }}>
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer changeFooter="out-footer style-2" />
    </div>

  )
}



function Layout5() {
  const sideMenu = useSelector(state => state.sideMenu);
  const { sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body message-body mh-auto">
        <div className="container-fluid mh-auto p-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
function Layout6() {
  const sideMenu = useSelector(state => state.sideMenu);
  const { sidebariconHover } = useContext(ThemeContext);
  return (
    <div id="main-wrapper" className={`show ${sidebariconHover ? "iconhover-toggle" : ""} ${sideMenu ? "menu-toggle" : ""}`}>
      <Nav />
      <div className="content-body">
        <div className="container-fluid">
          <Outlet />
        </div>
      </div>
      <Footer changeFooter="out-footer style-1" />
    </div>
  )
}

export default Markup;