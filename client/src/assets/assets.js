import LewisStore_Logo from "./LewisStore_Logo.png";
import search_icon from "./search_icon.png";
import user_icon from "./user_icon.png";
import cart_icon from "./cart_icon.png";
import menu_icon from "./menu_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import image_holder from "./image_holder.png";
import exchange_icon from "./exchange_icon.png";
import reliable_icon from "./reliable_icon.png";
import secure_icon from "./secure_icon.png";
import bestSeller from "../components/common/BestSeller"; // This import is unused here but kept from original

import landingPage_bg from "./landingPage_bg.jpg";
import p_img1 from "./p_img1.png";
import p_img2 from "./p_img2.png";
import p_img3 from "./p_img3.png";
import p_img4 from "./p_img4.png";
import p_img5 from "./p_img5.png";
import p_img6 from "./p_img6.png";
import p_img7 from "./p_img7.png";
import p_img8 from "./p_img8.png";
import p_img9 from "./p_img9.png";
import p_img10 from "./p_img10.png";
import p_img11 from "./p_img11.png";

import partner1 from "./partner1.png";
import partner2 from "./partner2.png";
import partner3 from "./partner3.png";
import partner4 from "./partner4.png";
import partner5 from "./partner5.png";
import partner6 from "./partner6.png";

export const assets = {
  /*{Icons}*/
  LewisStore_Logo,
  search_icon,
  user_icon,
  cart_icon,
  menu_icon,
  dropdown_icon,
  image_holder,
  exchange_icon,
  reliable_icon,
  secure_icon,

  /*{Backgrounds}*/
  landingPage_bg,

  /*{Partner logos}*/
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  
  // These imports of product images are kept for now, as they are likely used inside the ShopContext for local display until the API is fully set up to return picture URLs.
  p_img1, p_img2, p_img3, p_img4, p_img5, p_img6, p_img7, p_img8, p_img9, p_img10, p_img11
};

// *** FIX: Removed the local 'products' array to force API fetching ***
// export const products = [ ... ]; // This array has been removed.

// If your ShopContext *must* have an initial 'products' array, you need to update it 
// to fetch from the API using agent.js on mount.