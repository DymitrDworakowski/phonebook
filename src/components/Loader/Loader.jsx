import css from './Loader.module.css';


const Loader =()=>{
    return (
        <>
        <p>Please wait. Loading...</p>
        <span className={css.loader}></span>
        </>
    )
};

export default Loader;