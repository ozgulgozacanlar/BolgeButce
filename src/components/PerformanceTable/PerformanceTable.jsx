import './PerformanceTable.css';

export default function PerformanceTable() {
  return (
    <table className='performance-table'>
      <thead>
        <tr>
          <th></th>
          <th>Aylık Başarı Skor</th>
          <th>Yaygınlık Yön.</th>
          <th>Yaygınlık Gerç</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>İşkolu Yön.</th>
          <td><div>%83</div></td>
          <td><div>%83</div></td>
          <td><div>%83</div></td>
        </tr>
        <tr>
          <th>Ticari</th>
          <td><div>%87</div></td>
          <td><div>%87</div></td>
          <td><div>%87</div></td>
        </tr>
        <tr>
          <th>KOBİ</th>
          <td><div>%88</div></td>
          <td><div>%88</div></td>
          <td><div>%88</div></td>
        </tr>
        <tr>
          <th>Bireysel</th>
          <td><div>%87</div></td>
          <td><div>%87</div></td>
          <td><div>%87</div></td>
        </tr>
        <tr>
          <th>Bilanço Yön.</th>
          <td><div>%88</div></td>
          <td><div>%88</div></td>
          <td><div>%88</div></td>
        </tr>
      </tbody>
    </table>
  );
}
