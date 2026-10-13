import TypeAnimation from "./Typing_Animation";
import { SOCIAL_ICONS } from "./Social_Icons";
import PhotoLogo from "./Photo_Logo_Animation";
import {CopyToClipboard } from "react-copy-to-clipboard";
import {useEffect, useState } from "react";


//importing the CSS styling for the front page + email tooltip
import "./Front_Page.css";







//Frontpage class containing all the front page elements: coin animation for main logo + contact links + typing animation
const FrontPage = () => {


  // boolean state variable tracking + displying copied message
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () =>{
    setIsCopied(true);
  }


  //animation fade away effect for copied tool tip
  useEffect(
    () => {

      // resetting copied boolean + timeout for copy to dissapear
      setTimeout(() => {

        // resetting the copied boolean
        if (isCopied) setIsCopied(false)


      }, 1000)
    }
  )
  
  return (
    //div containing social media links
    <div className="home-page">
      <PhotoLogo />

      <div className="social-links-div">
        <ul className="social-menu">
          {SOCIAL_ICONS.map((item, index) => {

            // for email, return the icon with CopyToClipboard
            if (item.name==="email"){
              return (

                
                <div>
                <CopyToClipboard text={item.url} onCopy = {handleCopy}>  
                  <div>
                  <a href="#" className={item.cName}>
                    {""}
                    <li key={index} className="social-li">
                      {" "}
                        <i className={item.icon_pic}> </i>
                      
                    </li>
                  {" "}
                  </a>
                  </div>
                </CopyToClipboard>

                <div>
                  {isCopied && <p>Copied!</p>}
                </div>
                </div>
                
                
                

              );
            }

            // for other social links return the regular social link
            else{
              return (
                <div>
                <a className={item.cName} href={item.url} rel="noopener">
                  {""}
                <li key={index} className="social-li">
                  {" "}
                    <i className={item.icon_pic}> </i>
                  
                </li>
                {" "}
                </a>
                </div>
              );
            }



          })}
        </ul>
      </div>

      

      {/* div containing main fade-in text on home page */}
      <div className="home-text">
        <h1 className="bold-title-1">Hey 👋 I'm Shreyas Raman</h1>
      </div>

      <TypeAnimation />
    </div>
  );
  
}

export default FrontPage;
