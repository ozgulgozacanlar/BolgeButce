import './NavBar.css';
import { UserCircle } from '@/components';
import { GarantiLogo } from '@/assets/svg';
export default function NavBar() {

  return (
    <div className="container">
      <div className="header-wrapper">
          <div className="logo-wrapper"><GarantiLogo /></div>
          <div className="tab-wrapper">
            <div className="tab-item active">Kokpit</div>
            <div className="tab-item">MDS/NTS/Hacim</div>
            <div className="tab-item">GÖSAŞ/Müşteri</div>
            <div className="tab-item">NPL/Kârlılık</div>
            <div className="tab-item">Maaş Kârlılık</div>
          </div>
          <UserCircle />
      </div>

    </div>
  );
}
