import React from "react";
import styles from './Slide.module.css';

const Slide = (props) => {
    return (
        <div className={styles.slide}>
            <img 
                className={styles.image} 
                src={props.src} alt={props.alt} width={props.width} height={props.height}
            />
            <div className={styles.overlay}>{props.adv}</div>
        </div>
    );
}

export default Slide;
