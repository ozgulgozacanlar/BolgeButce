import { GreyKpiCard, PerformanceTable } from '@/components';
export default function Home() {


  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12 col-xl-4 d-flex">
          <div className="card">
            <div className="card-title">Çalışma Büyüklüğü Hedef Performansı</div>
            <div className="card-content">
              <div className="">chart goes here</div>
              <table className="performance-table single-row">
                <thead>
                  <tr>
                    <th></th>
                    <th>Ticari</th>
                    <th>KOBİ</th>
                    <th>Bireysel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Aylık Başarı Skor</th>
                    <td>%88</td>
                    <td>%87</td>
                    <td>%83</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div className="col-12 col-xl-4 d-flex">
          <div className="card">
            <div className="card-title">Çalışma Büyüklüğü İşkolu Dağılım</div>
            <div className="card-content">
              <div className="d-flex align-items-center justify-content-between">
                <div className="kpi-title">Çalışma Büyüklüğü <br/>(Bağımsız - Mio TL)</div>
                <div className="kpi-value">132.876</div>
              </div>
              <div className="my-3">chart goes here</div>
              <div className="legends-kpi-wrapper">
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div className="legend-sq green"></div>
                    <div className="legend-text">Bireysel</div>
                  </div>
                  <div className="legend-kpi">64,66 M</div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div className="legend-sq orange"></div>
                    <div className="legend-text">KOBİ</div>
                  </div>
                  <div className="legend-kpi">23,89 M</div>
                </div>
                <div className="d-flex flex-column align-items-center">
                  <div className="d-flex align-items-center gap-2">
                    <div className="legend-sq red"></div>
                    <div className="legend-text">Ticari</div>
                  </div>
                  <div className="legend-kpi">14,20 M</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-4 d-flex">
          <div className="card">
            <div className="card-title">Kâr/Zarar Performansı</div>
            <div className="card-content">
              <div className="">chart goes here</div>
              <GreyKpiCard text="Gerçekleşen Kâr Küm (Bin TL)" kpi="1.234.567"/>
            </div>
            
          </div>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 col-xl-6 d-flex">
          <div className="card">
            <div className="d-flex align-items-center justify-content-between card-title-wrapper">
              <div className="card-title">Pusula Performansı</div>
              <div className="detail-btn">Detaylar</div>
            </div>
            <div className="card-content">
              <div className="d-flex align-items-center justify-content-between">
                <div className="">chart goes here</div>
                <PerformanceTable />
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3 d-flex">
          <div className="card">
            <div className="card-title">Yoğun Gün Çalışma Süresi</div>
            <div className="card-content">
              <div className="">chart goes here</div>
              <GreyKpiCard text="Geçen Ay" kpi="%92"/>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-3 d-flex">
          <div className="card">
            <div className="card-title">Nakit İşlem Süresi</div>
            <div className="card-content">
              <div className="">chart goes here</div>
              <GreyKpiCard text="Geçen Ay" kpi="%92"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
