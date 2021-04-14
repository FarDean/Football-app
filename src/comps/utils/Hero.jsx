import styles from "./../../styles/Hero.module.css";
export const Hero = ({ text, icon = null }) => {
	return (
		<div className={styles.hero}>
			{icon ? <img src={icon} alt="" /> : <div class={styles.pulse}></div>}
			<h1>{text}</h1>
		</div>
	);
};
