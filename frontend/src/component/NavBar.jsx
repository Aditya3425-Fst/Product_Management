import React from 'react'
import styles from './NavBar.module.css';
import {Link} from 'react-router-dom';
export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <ul className={styles.menu}>
         <li className={styles.item}>
            <Link to='/'>home</Link>
         </li>
         <li className={styles.item}>
            <Link to='/addproduct'>Add products</Link>
         </li>
         <li className={styles.item}>
            <Link to="/login">signin</Link>
         </li>
      </ul>
    </div>
  )
}