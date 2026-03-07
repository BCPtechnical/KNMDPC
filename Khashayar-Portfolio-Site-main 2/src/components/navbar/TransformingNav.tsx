import styled from 'styled-components';
import useScreenSize from '../hooks/useScreenSize';
import DesktopNavBar from './DesktopNavBar';
import MobileNavBar from './MobileNavBar';
import { NavBarOption } from '@/utils/types';

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 999999;
`;

// Default Export
export default function Component({
  menuOptions = [],
  mobileMenuOptions,
  desktopMenuOptions,
}: {
  menuOptions?: NavBarOption[];
  mobileMenuOptions?: NavBarOption[];
  desktopMenuOptions?: NavBarOption[];
}) {
  const isMobile = useScreenSize();

  // Use specific menu options if provided, otherwise fall back to the common menuOptions
  const mobileTabs = mobileMenuOptions || menuOptions;
  const desktopTabs = desktopMenuOptions || menuOptions;

  return (
    <NavContainer>
      {isMobile && <MobileNavBar menuOptions={mobileTabs} />}
      {!isMobile && <DesktopNavBar menuOptions={desktopTabs} />}
    </NavContainer>
  );
}
