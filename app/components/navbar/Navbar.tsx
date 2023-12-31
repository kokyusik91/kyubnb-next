'use client';

// npx prisma db push를 하게 되면 prisma 스키마를 사용가능하다.
import Container from '../Container';
import Categories from './Categories';
import Logo from './Logo';
import Search from './Search';
import UserMenu from './UserMenu';

import { SafeUser } from '@/app/types';

interface NavBarProps {
  currentUser?: SafeUser | null;
}

function NavBar({ currentUser }: NavBarProps) {
  console.log('currentUser', { currentUser });
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <Search />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories/>
    </div>
  );
}

export default NavBar;
