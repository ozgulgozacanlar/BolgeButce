/**
 * Parametre olaran verilen sayı değeri formatlanır.
 *
 * @param {Number} value Formatlanacak değer
 * @param {Number} decimalCount Virgülden sonra kaç hane
 * @param {Boolean} isAbbreviate True/False, kısaltma var mı yok mu, default 'true'
 * @param {String} locale Hangi lokal ayarlar kullanıcak default 'tr-TR'
 * @returns {String} Formatlanmış değer
 *
 * @example
 * nFormatter(1230,0) // Returns '1 k'
 * nFormatter(1213.12,1) // Returns '1.1 k'
 * nFormatter(1213.12,1,true) // Returns '1.1 k'
 * nFormatter(6500000,2,true) // Returns '6.50 M'
 * nFormatter(6500000,2,false) // Returns '6.500.000,00'
 */
export function nFormatter(value, decimalCount, isAbbreviate = true, locale = 'tr-TR') {
  const si = [
    { value: 1e18, symbol: ' E' },
    { value: 1e15, symbol: ' P' },
    { value: 1e12, symbol: ' T' },
    { value: 1e9, symbol: ' G' },
    { value: 1e6, symbol: ' M' },
    { value: 1e3, symbol: ' k' },
    { value: 1, symbol: '' },
  ];

  // sayı negatif ise '-' ekliyoruz
  const sign = value < 0 ? '-' : '';
  // hesaplama için mutlak değerini alıyoruz
  const absValue = Math.abs(value);
  // ilk küçük SI değerini buluyoruz
  const abbr = si.find((_) => _.value <= absValue);

  if (isAbbreviate) {
    return sign + (absValue / abbr.value).toFixed(decimalCount) + abbr.symbol;
  }
  return (
    sign + absValue.toLocaleString(locale, { maximumFractionDigits: decimalCount, minimumFractionDigits: decimalCount })
  );
}

/**
 * Örnek fonksiyon tanımı
 *
 * @param {*} param1 Birinci parametre
 * @param {*} param2 İkinci parametre
 * @returns {Object} Param1 ve Param2 değerlerini içeren JSON Object
 *
 * @example
 * anotherFoo(a,b) // Returns { param1: a, param2: b }
 */
export function anotherFoo(param1, param2) {
  return { param1, param2 };
}
