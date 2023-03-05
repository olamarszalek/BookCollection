import { FC } from "react";
import style from './Footer.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';


export const Footer: FC = () => {
    return (
        <footer>
            <div className={style.footer}>
                    <span> Developed by A. Marszałek | <a href="https://github.com/olamarszalek"><FontAwesomeIcon icon={faGithub} className={style.icon} /></a> <a href="https://www.linkedin.com/in/aleksandra-marsza%C5%82ek-44a1b7147"><FontAwesomeIcon icon={faLinkedin} className={style.icon}/></a></span>
            </div>
        </footer>
    )
}