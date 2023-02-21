import { Link } from 'react-router-dom';
import { FC } from 'react';
import style from './Nav.module.scss'
import { navElements } from '../../Store/HelperInterface';

interface PropsNav {
    children?: JSX.Element | JSX.Element[]
    navElements: navElements[]
}

export const Nav: FC<PropsNav> = props => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/all">All Books</Link>
                </li>
                <li>
                    <Link to="/add">Add Books</Link>
                </li>
            </ul>
        </nav>
    )
}