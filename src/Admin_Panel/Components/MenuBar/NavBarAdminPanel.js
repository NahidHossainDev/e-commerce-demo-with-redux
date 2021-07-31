import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import "./NavBarAdminPanel.css";

const NavBarAdminPanel = () => {
  const location = useLocation();

  const menuItem = [
    { name: "Orders", link: "/admin/orders" },
    {
      name: "Promotions",
      subMenu: [{ name: "Promo Codes", link: "/admin/promotion/promo_codes" },
        { name: "Add New Code", link: "/admin/promotion/add_new_promo_codes" }
      ]
    },
    { name: "Products", link: "/admin/products" }
  ]
  
    return (
      <nav>
        {menuItem.map((d, i) =>
          d.subMenu ? (
            <Accordion key={i} defaultExpanded={location.pathname.includes("promotion")}>
              <AccordionSummary>{d.name}</AccordionSummary>
              <AccordionDetails>
                {d.subMenu.map((subItem, subIndex) => {
                  return (
                    <Link to={subItem.link} key={subIndex}>
                      <li className={location.pathname === subItem.link ? "active":""}>
                        {subItem.name}
                      </li>
                    </Link>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ) : (
            <Link to={d.link} key={i}>
              <li className={location.pathname === d.link ? "active":""}>
                {d.name}
              </li>
            </Link>
          )
        )}
      </nav>
    );
};

export default NavBarAdminPanel;