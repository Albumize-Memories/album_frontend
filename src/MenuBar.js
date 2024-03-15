import React from "react";
import { Button, IconButton } from '@chakra-ui/react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
  } from '@chakra-ui/react'
  import MenuIcon from '@mui/icons-material/Menu';

const MenuBar = () => {  
  return (
    <Menu>
<MenuButton
    as={IconButton}
    aria-label='Options'
    icon={<MenuIcon />}
    variant='outline'
  />    
  <MenuList>
    <MenuItem>Order tracking</MenuItem>
    <MenuDivider />
    <MenuItem>My Saved Products</MenuItem>
    <MenuDivider />
    <MenuItem>Contact</MenuItem>
  </MenuList>
</Menu>
  );
}

export default MenuBar;
