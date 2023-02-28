import { Link } from 'react-router-dom';
import { FC } from 'react';
import style from './Nav.module.scss'
import { navElements } from '../../Store/HelperInterface';
import { unstable_styleFunctionSx } from '@mui/system';

interface PropsNav {
    children?: JSX.Element | JSX.Element[]
    navElements: navElements[]
}

export const Nav: FC<PropsNav> = props => {
   
    return (
        <nav className={style.nav}>
            <ul>
                <li>
                    <Link className={style.link} to="/">Home</Link>
                </li>
                <li>
                    <Link className={style.link} to="/all">All Books</Link>
                </li>
                <li>
                    <Link className={style.link} to="/add">Add Books</Link>
                </li>
            </ul>
        </nav>
    )
}