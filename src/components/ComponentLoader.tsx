"use client";

import styles from "@/styles/components/ComponentLoader.module.css";

interface ComponentLoaderProps {
    loading?: boolean;
}


const ComponentLoader = ({ loading = true }: ComponentLoaderProps) => {
    if (!loading) {
        return null;
    }

    return(
        <div className={styles.overlay}>
        <div className={styles.loaderContainer}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
        </div>
    )
}

export default ComponentLoader;