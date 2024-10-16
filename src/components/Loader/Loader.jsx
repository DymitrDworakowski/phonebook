import css from './Loader.module.css';


const Loader =()=>{
    return (
        <div className={css.div_loader}>
        <p>Please wait. Loading...</p>
        <span className={css.loader}></span>
        </div>
    )
};

export default Loader;