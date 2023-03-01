import { FC } from "react";
import style from './Footer.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';


export const Footer: FC = () => {
    return (
        <footer>
            <div className={style.footer}>
                    <span> Developed by A. Marszałek | <FontAwesomeIcon icon={faGithub} className={style.icon} /> <FontAwesomeIcon icon={faLinkedin} className={style.icon}/></span>
            </div>
        </footer>
    )
}