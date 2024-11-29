import * as SVG from '@/assets/svg';
import * as Pages from '@/pages';

// Bu fonksiyon, menü verilerinden routeları çıkartır ve dizi olarak döndürür.
function extractRoutes(data) {
  const routes = [];

  data.forEach((item) => {
    // Eğer öğenin bir route varsa, route'u diziye ekler.
    if (item.route) {
      routes.push({ route: item.route, routeText: item.routeText });
    }

    // Eğer öğenin alt öğeleri (subNodes) varsa, bu alt öğeleri de tarar ve rotalara ekler.
    if (item.subNodes) {
      routes.push(...extractRoutes(item.subNodes));
    }
  });

  return routes;
}

// Menü öğeleri ve route'larını içeren bir context oluşturulur.
export const menuContext = [
  {
    text: 'Ana Sayfa',
    route: Pages.Home,
    routeText: 'home',
    svg: SVG.Home,
  },
  {
    text: 'Hakkında',
    route: Pages.About,
    routeText: 'about',
    svg: SVG.Detail,
  },
 
];

export const routeArray = extractRoutes(menuContext);
