import styles from "./../../styles/Hero.module.css";

interface Props {
	text: string;
	icon?: string;
}

export const Hero: React.FC<Props> = ({ text, icon }): JSX.Element => {
	return (
		<div className={styles.hero}>
			<h1>{text}</h1>
			{icon ? <img src={icon} alt="" /> : <div className={styles.pulse}></div>}
		</div>
	);
};
