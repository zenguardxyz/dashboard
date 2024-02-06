// import { RequireAuth, NotFound } from "../components";
import HomePage  from '../pages/Home.page';
import PublishScreen  from '../pages/publish/publish-screen';
import AccountScreen  from '../pages/account/account-screen';
import PublishDetailsScreen  from '../pages/publish/publish-details.screen';
import ModuleDetailsScreen  from '../pages/modules/module-details.screen';
import ModuleAttestationScreen from '../pages/modules/module-attestation.screen';
import { createBrowserRouter, HashRouter, RouterProvider,Routes, Route } from 'react-router-dom';
import { RoutePath } from "./route-path";


export const Navigation = () => {
  return (
    <Routes>
      <Route path={RoutePath.home} element={<HomePage />} />
      <Route path={RoutePath.pluginDetails} element={<ModuleDetailsScreen />} />
      <Route path={RoutePath.moduleAttestation} element={<ModuleAttestationScreen />} />
      <Route path={RoutePath.account} element={<AccountScreen />} />
      <Route path={RoutePath.publish} element={<PublishScreen />} />
      <Route path={RoutePath.publishDetails} element={<PublishDetailsScreen />} />
    </Routes>
  );
};



export const LandingPageNavigation = () => {
  return (
    <>
      {/* <GlobalStyle /> */}
      {/* <HashRouter> */}
      <Routes>
        <Route path={RoutePath.home} element={<HomePage />} />
      </Routes>
      {/* </HashRouter> */}
    </>
  );
};


