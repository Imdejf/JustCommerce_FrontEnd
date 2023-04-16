import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import AddArtist from "components/artists/form/AddArtist";
import Categories from "components/shop/Categories/Categories";
import Artists from "components/artists/Artists";
import ArtistDetail from "components/artists/detail/ArtistDetail";
import AuthPage from "components/auth/LoginPage";
import ChangePassword from "components/profile/ChangePassword";

import Conditions from "components/conditions/Conditions";
import ConditionDetail from "components/conditions/detail/ConditionDetail";

import AddCondition from "components/conditions/form/AddCondition";
import EditCondition from "components/conditions/form/EditCondition";

import Contacts from "components/contacts/Contacts";
import ContentContainer from "components/layout/ContentContainer";

import DigitalReleases from "components/digitalRelease/DigitalRelease";
import DigitalReleaseDetail from "components/digitalRelease/detail/DigitalReleaseDetail";
import EditDigitalRelease from "components/digitalRelease/form/EditDigitalRelease";
import AddDigitalRelease from "components/digitalRelease/form/AddDigitalRelease";
import Attributes from "components/shop/Attributes/Attributes";
import EditArtist from "components/artists/form/EditArtist";

import EditUser from "components/users/EditUser";

import Home from "components/dashboard/Home";
import Layout from "components/layout/Layout";

import Profile from "components/profile/Profile";

import RegisterForm from "components/auth/Register/RegisterForm";
import RemindPassword from "components/auth/remindPassword/RemindPassword";

import SalesChannel from "components/salesChannel/SalesChannel";
import AddSalesChannel from "components/salesChannel/form/AddSalesChannel";
import EditSalesChannel from "components/salesChannel/form/EditSalesChannel";

import Tracks from "components/tracks/Tracks";
import TrackDetail from "components/tracks/detail/TrackDetail";
import AddTrack from "components/tracks/form/AddTrack";
import EditTrack from "components/tracks/form/EditTrack";
import Recommendations from "components/shop/Recommendations/Recommendations";
import Users from "components/users/Users";
import UserDetail from "components/users/detail/UserDetail";
import Delivery from "components/shop/Delivery/Delivery";
import PrivateRoute from "./PrivateRoute";
import Badges from "components/shop/Badges/Badges";

import { authorize } from "store/actions/auth";
import { RootState } from "store/store";

import Files from "components/Files";
import AddFiles from "components/AddFiles";
import PlayerProfiles from "components/playerProfiles/PlayerProfiles";
import PlayerProfilesDetail from "components/playerProfiles/detail/PlayerProfilesDetail";
import AddPlayerProfile from "components/playerProfiles/form/AddPlayerProfile";
import EditPlayerProfiles from "components/playerProfiles/EditPlayerProfiles";
import AddTrainerProfile from "components/trainerProfiles/form/AddTrainerProfile";
import EditTrainerProfiles from "components/trainerProfiles/EditTrainerProfiles";
import TrainerProfilesDetail from "components/trainerProfiles/detail/TrainerProfilesDetail";
import TrainerProfiles from "components/trainerProfiles/TrainerProfiles";
import AddAcademies from "components/academies/form/AddAcademies";
import EditAcademies from "components/academies/EditAcademies";
import AcademiesDetail from "components/academies/detail/AcademiesDetail";
import Academies from "components/academies/Academies";
import Orders from "components/shop/Orders/Orders";
import OrdersDetail from "components/shop/Orders/detail/OrdersDetail";

//JustCommerce
import ProductAttributeGroup from "components/catalog/ProductAttributeGroup/ProductAttributeGroup";
import AddProductAttributeGroup from "components/catalog/ProductAttributeGroup/form/AddProductAttributeGroup";
import EditProductAttributeGroup from "components/catalog/ProductAttributeGroup/form/EditProductAttributeGroup"
import ProductAttributeGroupDetail from "components/catalog/ProductAttributeGroup/detail/ProductAttributeGroupDetail";

import ProductAttribute from "components/catalog/ProductAttribute/ProductAttribute";
import AddProductAttribute from "components/catalog/ProductAttribute/form/AddProductAttribute";
import EditProductAttribute from "components/catalog/ProductAttribute/form/EditProductAttribute";
import ProductAttributeDetail from "components/catalog/ProductAttribute/detail/ProductAttributeDetail";

import AddProductTemplate from "components/catalog/ProductTemplate/form/AddProductTemplate";
import EditProductTemplate from "components/catalog/ProductTemplate/form/EditProductTemplate";
import ProductTemplate from "components/catalog/ProductTemplate/ProductTemplate";
import ProductTemplateDetail from "components/catalog/ProductTemplate/detail/ProductTemplateDetail";

import ProductOption from "components/catalog/ProductOption/ProductOption";
import AddProductOption from "components/catalog/ProductOption/form/AddProductOption";
import EditProductOption from "components/catalog/ProductOption/form/EditProductOption";
import ProductOptionDetail from "components/catalog/ProductOption/detail/ProductOptionDetail";

import Category from "components/catalog/Category/Category";
import AddCategory from "components/catalog/Category/form/AddCategory";
import EditCategory from "components/catalog/Category/form/EditCategory";
import CategoryDetail from "components/catalog/Category/detail/CategoryDetail";

import Product from "components/catalog/Product/Product";
import AddProduct from "components/catalog/Product/form/AddProduct"
import ProductDetail from "components/catalog/Product/detail/ProductDetail"

const AppRouter: React.FC = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation<{ from: string }>();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authorize());
  }, [dispatch, location]);

  return (
    <Layout>
      <Switch>
        <Route exact path="/login">
          {isAuth ? (
            <Redirect to={location.state?.from || "/"} />
          ) : (
            <AuthPage />
          )}
        </Route>

        <Route exact path="/remindPassword">
          <RemindPassword />
        </Route>

        <PrivateRoute path="/">
          <Route exact path="/accounts/add">
            <AddArtist />
          </Route>
          <Route exact path="/accounts/edit/:id">
            <EditArtist />
          </Route>
          <Route exact path="/accounts/detail/:id">
            <ArtistDetail />
          </Route>
          <Route exact path="/accounts">
            <Artists />
          </Route>

          {/* <Route exact path="/settlements/conditions/add">
            <AddCondition />
          </Route>
          <Route exact path="/settlements/conditions/add/:licensorId">
            <AddLicensorCondition />
          </Route>
          <Route exact path="/settlements/conditions/edit/:id">
            <EditCondition />
          </Route>
          <Route exact path="/settlements/conditions/detail/:id">
            <ConditionDetail />
          </Route>
          <Route exact path="/settlements/conditions">
            <Conditions />
          </Route> */}

          <Route exact path="/contacts">
            <Contacts />
          </Route>

          <Route exact path="/shop/products/add">
            <AddDigitalRelease />
          </Route>
          <Route exact path="/shop/products/edit/:id">
            <EditDigitalRelease />
          </Route>
          <Route exact path="/shop/products/detail/:id">
            <DigitalReleaseDetail />
          </Route>
          <Route exact path="/shop/products">
            <DigitalReleases />
          </Route>

          <Route exact path="/shop/orders/detail/:id">
            <OrdersDetail />
          </Route>
          <Route exact path="/shop/orders">
            <Orders />
          </Route>

          <Route exact path="/shop/recommendations">
            <Recommendations />
          </Route>

          <Route exact path="/shop/delivery">
            <Delivery />
          </Route>

          <Route exact path="/shop/badges">
            <Badges />
          </Route>

          <Route exact path="/shop/attributes">
            <Attributes />
          </Route>

          <Route exact path="/shop/categories">
            <Categories />
          </Route>

          <Route exact path="/catalog/product-attribute-group">
            <ProductAttributeGroup/>
          </Route>

          <Route exact path="/catalog/product-attribute-group/add">
            <AddProductAttributeGroup/>
          </Route>

          <Route exact path="/catalog/product-attribute-group/edit/:id">
            <EditProductAttributeGroup/>
          </Route>

          <Route exact path="/catalog/product-attribute-group/detail/:id">
            <ProductAttributeGroupDetail/>
          </Route>

          <Route exact path="/catalog/product-attribute/detail/:id">
            <ProductAttributeDetail/>
          </Route>

          <Route exact path="/catalog/product-attribute">
            <ProductAttribute/>
          </Route>

          <Route exact path="/catalog/product-attribute/add">
            <AddProductAttribute/>
          </Route>

          <Route exact path="/catalog/product-attribute/edit/:id">
            <EditProductAttribute/>
          </Route>

          <Route exact path="/catalog/product-option/detail/:id">
            <ProductOptionDetail/>
          </Route>

          <Route exact path="/catalog/product-option">
            <ProductOption/>
          </Route>

          <Route exact path="/catalog/product-option/add">
            <AddProductOption/>
          </Route>

          <Route exact path="/catalog/product-option/edit/:id">
            <EditProductOption/>
          </Route>

          <Route exact path="/catalog/product-template/detail/:id">
            <ProductTemplateDetail/>
          </Route>

          <Route exact path="/catalog/product-template">
            <ProductTemplate/>
          </Route>

          <Route exact path="/catalog/product-template/add">
            <AddProductTemplate/>
          </Route>

          <Route exact path="/catalog/product-template/edit/:id">
            <EditProductTemplate/>
          </Route>

          <Route exact path="/catalog/category">
            <Category/>
          </Route>

          <Route exact path="/catalog/category/add">
            <AddCategory/>
          </Route>

          <Route exact path="/catalog/category/edit/:id">
            <EditCategory/>
          </Route>

          <Route exact path="/catalog/category/detail/:id">
            <CategoryDetail/>
          </Route>

          <Route exact path="/catalog/product">
            <Product/>
          </Route>

          <Route exact path ="/catalog/product/add">
            <AddProduct/>
          </Route>

          <Route exact path="/catalog/product/detail/:id">
            <ProductDetail/>
          </Route>

          {/* <Route exact path="/licensors/add">
            <AddLicensor />
          </Route>
          <Route exact path="/licensors/edit/:id">
            <EditLicensor />
          </Route>
          <Route exact path="/licensors/detail/:id">
            <LicensorDetail />
          </Route>
          <Route exact path="/licensors">
            <Licensors />
          </Route> */}

          {/* <Route exact path="/providers/add">
            <AddProvider />
          </Route>
          <Route exact path="/providers/edit/:id">
            <EditProvider />
          </Route>
          <Route exact path="/providers/detail/:id">
            <ProviderDetail />
          </Route>
          <Route exact path="/providers">
            <Providers />
          </Route> */}

          {/* <Route exact path="/settlements/salesChannel/add/:id?">
            <AddSalesChannel />
          </Route>
          <Route exact path="/settlements/salesChannel/edit/:id">
            <EditSalesChannel />
          </Route>
          <Route exact path="/settlements/salesChannel">
            <SalesChannel />
          </Route>

          <Route exact path="/tracks/add">
            <AddTrack />
          </Route>
          <Route exact path="/tracks/edit/:id">
            <EditTrack />
          </Route>
          <Route exact path="/tracks/detail/:id">
            <TrackDetail />
          </Route>
          <Route exact path="/tracks">
            <Tracks />
          </Route> */}

          <Route exact path="/users/add">
            <RegisterForm />
          </Route>
          <Route exact path="/users/edit/:id">
            <EditUser />
          </Route>
          <Route exact path="/users/detail/:id">
            <UserDetail />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>

          <Route exact path="/player-profiles/add">
            <AddPlayerProfile />
          </Route>
          <Route exact path="/player-profiles/edit/:id">
            <EditPlayerProfiles />
          </Route>
          <Route exact path="/player-profiles/detail/:id">
            <PlayerProfilesDetail />
          </Route>
          <Route exact path="/player-profiles">
            <PlayerProfiles />
          </Route>

          <Route exact path="/trainer-profiles/add">
            <AddTrainerProfile />
          </Route>
          <Route exact path="/trainer-profiles/edit/:id">
            <EditTrainerProfiles />
          </Route>
          <Route exact path="/trainer-profiles/detail/:id">
            <TrainerProfilesDetail />
          </Route>
          <Route exact path="/trainer-profiles">
            <TrainerProfiles />
          </Route>

          <Route exact path="/academies/add">
            <AddAcademies />
          </Route>
          <Route exact path="/academies/edit/:id">
            <EditAcademies />
          </Route>
          <Route exact path="/academies/detail/:id">
            <AcademiesDetail />
          </Route>
          <Route exact path="/academies">
            <Academies />
          </Route>

          <Route exact path="/files">
            <Files />
          </Route>

          <Route exact path="/files/add">
            <AddFiles />
          </Route>

          <Route path="/profile">
            <Profile />
            <Switch>
              <Route exact path="/profile/changePassword">
                <ContentContainer title="Zmień hasło">
                  <ChangePassword />
                </ContentContainer>
              </Route>
            </Switch>
          </Route>

          <Route exact path="/">
            <Home />
          </Route>
        </PrivateRoute>
      </Switch>
    </Layout>
  );
};

export default AppRouter;
