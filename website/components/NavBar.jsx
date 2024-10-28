'use client';

import { Sheet, Stack, Typography, Box, Menu, MenuItem, Dropdown, MenuButton } from '@mui/joy';
import Link from 'next/link';
import { navData } from '@/app/data';
import React, { useRef, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GitHubIcon from '@mui/icons-material/GitHub';

const SubMenu = ({ subData }) => (
  <Menu
    variant='plain'
    placement='bottom-start'
    sx={{ borderRadius: '0px 10px 10px 10px', border: 0 }}
  >
    {subData.map(({ text, href }, idx) => (
      <MenuItem
        key={idx}
        component={Link}
        href={href}
        sx={{
          borderLeft: '3px solid transparent',
          '&:hover': { borderLeftColor: '#33373D' },
          '&:focus': { outline: 'none' },
          padding: '13px',
        }}
      >
        <Typography level='subtitle-light' textAlign='left' sx={{ zIndex: 2 }}>
          {text}
        </Typography>
      </MenuItem>
    ))}
  </Menu>
);

const NavItem = ({ title, navigateTo, subData }) => {
  const activePage = usePathname();
  const hasSubMenu = Boolean(subData?.length);
  const [open, setOpen] = useState(false);

  return (
    <Dropdown open={open} onOpenChange={(_, isOpen) => setOpen(isOpen)}>
      <MenuButton
        component={Link}
        href={navigateTo}
        sx={{
          width: '100%',
          textDecoration: 'none',
          borderBottom: activePage === navigateTo ? '4px solid #33373D' : 'none',
          '&:focus': { outline: 'none' },
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <Typography level='subtitle-light' fontSize='1.7rem' textAlign='center' sx={{ zIndex: 2 }}>
          {title}
        </Typography>
        {hasSubMenu && <ExpandMoreIcon sx={{ pt: 0.5, fontSize: '1.7rem' }} />}
      </MenuButton>
      {hasSubMenu && <SubMenu subData={subData} />}
    </Dropdown>
  );
};

const NavBar = () => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY <= lastScrollY.current);
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Sheet
      sx={{
        height: 80,
        display: { xs: 'none', lg: 'flex' },
        position: 'fixed',
        top: visible ? 0 : -80,
        width: '100%',
        zIndex: 1000,
        transition: 'top 0.3s',
      }}
    >
      <Stack direction='row' alignItems='center' width='100%' height='100%' px={2}>
        <Box sx={{ flex: 0.5 }}>
          <Link href='/'>
            <Typography className='purple' fontSize='3rem'>
              6841
            </Typography>
          </Link>
        </Box>
        <Stack direction='row' width='100%' height='100%' px={5} sx={{ flexGrow: 1 }}>
          {navData.map(({ text, href, subData }, idx) => (
            <NavItem title={text} navigateTo={href} subData={subData} key={idx} />
          ))}
        </Stack>
        <Stack direction='row' spacing={3} mx={3}>
          <Link href='https://github.com/noor367/COMP6841-project' target='_blank'>
            <GitHubIcon sx={{ color: 'black', width: 35, height: 35 }} />
          </Link>
        </Stack>
      </Stack>
    </Sheet>
  );
};

export default NavBar;