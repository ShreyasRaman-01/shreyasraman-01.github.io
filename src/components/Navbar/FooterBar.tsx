import { Component } from "react";


//importing the CSS styling for the footer
import styles from "./FooterBar.module.css";

//FooterBar class containing the footerbar element: using class since class state is utilized
class FooterBar extends Component {

    //function to render element on React App
  render() {
    return (
      
        <div className={styles.footerBarContainer}>

        <p className={styles.footerText}> Designed with ❤️ by Shreyas Raman © 2026-2028 </p>

        </div>
    );
  }






}

export default FooterBar;