import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import Link from 'next/link';

function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="md:!hidden">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-[#FBFEF9] !w-10 !h-10"
      >
        <Bars3Icon className="w-7 h-7" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/movie">
            <a>Movies</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/tv">
            <a>TV Shows</a>
          </Link>
        </MenuItem>
        {/* <MenuItem onClick={handleClose}>People</MenuItem>
        <MenuItem onClick={handleClose}>My List</MenuItem> */}
      </Menu>
    </div>
  );
}

export default BasicMenu;
