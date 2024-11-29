import { useState } from 'react';
import { Link } from 'react-router-dom';

import { DownChevron } from '@/assets/svg';

import './MenuItem.css';

// Alt menü öğesi bileşeni
function SubMenuItem({ item }) {
  return (
    <li>
      {/* Eğer bir "route" belirtilmişse, bir Link kullanarak yönlendirme yap */}
      {item.route ? <Link to={item.routeText}>{item.text}</Link> : <a href>{item.text}</a>}
    </li>
  );
}

// Alt menü bileşeni
function SubMenu({ subNodes }) {
  return (
    <ul className="submenu-indent">
      {subNodes.map((item, index) => (
        // Her alt menü öğesi için SubMenuItem bileşenini kullan
        <SubMenuItem key={index} item={item} />
      ))}
    </ul>
  );
}

// Yan menü öğesi bileşeni
export default function MenuItem({ data }) {
  const [isSubmenuActive, setSubmenuActive] = useState(false);

  // Alt menüyü açma / kapama işlevi
  const toggleSubMenu = () => {
    setSubmenuActive(!isSubmenuActive);
  };

  // Menü öğesi sınıfı, alt menü açık olduğunda "active" sınıfını ekler
  const menuItemClass = `menu-item ${isSubmenuActive ? 'active' : ''}`;

  return (
    <li className={menuItemClass}>
      {data.route ? (
        // Eğer bir "route" belirtilmişse, bir Link kullanarak yönlendirme yap
        <Link to={data.routeText}>
          <div className="menu-item-icon">
            <data.svg />
          </div>
          <span>{data.text}</span>
          {data.subNodes && <DownChevron isActive={isSubmenuActive} />}
        </Link>
      ) : (
        // Aksi takdirde, alt menüyü açma / kapama işlevini çalıştıran bir tıklama olayı ekler
        <a href onClick={toggleSubMenu}>
          <div className="menu-item-icon">
            <data.svg />
          </div>
          <span>{data.text}</span>
          {data.subNodes && <DownChevron isActive={isSubmenuActive} />}
        </a>
      )}

      {/* Eğer alt menü öğeleri varsa ve alt menü açıksa, alt menüyü göster */}
      {data.subNodes && isSubmenuActive && <SubMenu subNodes={data.subNodes} />}
    </li>
  );
}
