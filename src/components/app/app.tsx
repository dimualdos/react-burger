import { useEffect, FunctionComponent } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { useAppDispatch } from '../../hooks/hooks';
import { getItems } from "../../services/actions/ingredients";
import { updateToken } from "../../services/actions/auth";
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from "../modal/modal";
import AppHeader from '../app-header/header';
import { ProtectedRoute } from "../protected-route/protected-route";
import { Profile, LoginPage, ResetPass, Register, ForgotPass, NotFound404, MainPage, Orders } from "../../pages";
import styles from './app.module.css';
import { TLocationState } from '../../utils/types'





const App: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocationState>();
  const backgroundApp = location.state && location.state.background;
  // const orderNum = useRouteMatch([
  //   '/profile/orders/:number',
  //   '/feed/:number',
  // ])?.params?.number;

  const handleModalClose = () => history.goBack();

  useEffect(() => {
    dispatch(getItems());
    dispatch(updateToken());
  }, [dispatch])

  return (
    <>
      <div className={styles.page}>
        <AppHeader />
        <Switch location={backgroundApp || location}>
          <ProtectedRoute path="/profile" exact={true}>
            <Profile />
          </ProtectedRoute>
          <ProtectedRoute path="/profile/orders" exact={true}>
            <Orders />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/login" exact>
            <LoginPage />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/register" exact>
            <Register />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
            <ForgotPass />
          </ProtectedRoute>
          <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
            <ResetPass />
          </ProtectedRoute>

          <Route path={`/ingredients/:id`} exact>
            <div className={styles.ingredientWrapper}>
              <p className={styles.ingredientTitle}>???????????? ??????????????????????</p>
              <IngredientDetails />
            </div>
          </Route>


          <Route path="/" exact>
            <MainPage />
          </Route>
          <Route >
            <NotFound404 />
          </Route>
        </Switch>
      </div>
      {backgroundApp && (
        <>
          <Route path="/ingredients/:id" exact>
            <div className={styles.ingredientWrapper} >
              <Modal onClose={handleModalClose} title={'???????????? ??????????????????????'} overlay={true}>
                <IngredientDetails />
              </Modal>
            </div>
          </Route>
          {/* <ProtectedRoute
              path='/profile/orders/:orderNumber'
              exact >
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
            <Route
              path='/feed/number'
              exact >
              <Modal onClose={handleModalClose}>
                <OrderInfo />
              </Modal>
            </Route> */}
        </>
      )
      }
    </>
  );

}

export default App;
