import { useEffect } from 'react';
import './TableChart.css';

export default function TableChart({tableData}) {

    const getCircleColor = (value) => {
        // Sayıyı noktadan temizleyip tam sayıya dönüştür
        const numericValue = parseInt(value.replace(/\./g, ''), 10);
       console.log(numericValue)
        // 500.000'den büyükse yeşil, küçükse kırmızı yuvarlak
        return numericValue > 500000 ? 'green' : 'red';
      };
useEffect(() => {
    console.log(tableData)
}, [tableData]);
  return (
    <table className="table table-striped" style={{marginTop:'2.5rem'}}>
    <thead>
      <tr>
        {/* headers array'ini map ile döndürüp <th> öğelerine dönüştürüyoruz */}
        {tableData && tableData.headers.map((header, index) => (
          <th scope="col" key={index}>
            {header}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {tableData.data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => {
            // Eğer hücre boşsa, aynı başlıktaki diğer hücreyi kontrol et
            if (cell === '') {
              const header = tableData.headers[cellIndex]; // Oca.24, Şub.24, Mar.24 vb.

              // Aynı başlık altındaki ikinci hücreyi dinamik olarak bulalım
              const headerIndexes = tableData.headers
                .map((h, index) => h === header ? index : -1) // Aynı başlıkların index'lerini buluyoruz
                .filter(index => index !== -1); // -1 olanları filteleyip gerçek index'leri alıyoruz

              // Eğer başlık altında 2 veya daha fazla index varsa
              if (headerIndexes.length > 1) {
                // İkinci başlık altındaki değeri al
                const secondIndex = headerIndexes.find(index => index !== cellIndex); // Diğer index
                const compareValue = row[secondIndex]; // İkinci değeri al
                console.log(compareValue)
                // Eğer veri bulunduysa karşılaştırma yap ve yeşil/kırmızı yuvarlak ekle
                if (compareValue) {
                  return (
                    <td key={cellIndex}>
                      <span className={`circle ${getCircleColor(compareValue)}`} />
                    </td>
                  );
                }
              }
            }
            // Eğer hücre boş değilse, normal hücreyi göster
            return (
              <td key={cellIndex}>
                <span>{cell}</span>
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  </table>
  
  )
}
