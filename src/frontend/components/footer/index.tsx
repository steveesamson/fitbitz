import React from "react";
import "./footer.css";

const Footer: React.FC<any> = (props: any): JSX.Element => {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {year}, FitBitz. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
