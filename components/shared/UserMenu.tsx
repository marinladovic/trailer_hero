import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import Link from 'next/link';
import useAuth from '../../hooks/useAuth';

function UserMenu() {
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className="!text-[#FBFEF9] !w-10 !h-10"
      >
        <img
          src="/assets/account_image.png"
          alt="user avatar"
          className="cursor-pointer rounded"
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        className="userMenu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <p>
            <span className="text-base font-bold">Account Information</span>
          </p>
        </MenuItem>
        <MenuItem onClick={handleClose} className="!text-sm">
          <p>Email: {user?.email}</p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/movie">
            <a>Reset Password</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/mylist">
            <a>My List</a>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <p onClick={logout}>
            <span className="!text-[#FE4A49] !cursor-pointer">Logout</span>
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default UserMenu;
