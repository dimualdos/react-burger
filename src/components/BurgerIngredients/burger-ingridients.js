import{PropTypes} from 'prop-types'
import BurgerTabs from './BurgerTabs/burger-tabs';
import Ingridients from './Ingridients/ingridients';

import style from './burger-ingridients.module.css';

const BurgerIngredients = ({data}) => {

    return (
        <main className={style.mainBurger}>
            <section className={style.titleBurger}>
                <p className={style.titleText}>Соберите бургер</p>
            </section>
            <BurgerTabs />
            <Ingridients data={data} />
        </main>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.object.isRequired
}

export default BurgerIngredients;