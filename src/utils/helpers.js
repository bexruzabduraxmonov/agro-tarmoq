export function fmt(n) {
  if (n === undefined || n === null) return '0';
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function money(n) {
  return fmt(n) + ' soʻm';
}

// Regional market pricing multipliers
export const MARKET_FACTORS = [
  { name: 'Chorsu bozori', factor: 1.00, region: 'Toshkent shahri' },
  { name: 'Oloy bozori', factor: 1.05, region: 'Toshkent shahri' },
  { name: 'Qoʻqon bozori', factor: 0.94, region: 'Fargʻona viloyati' },
  { name: 'Samarqand bozori', factor: 0.98, region: 'Samarqand viloyati' },
  { name: 'Fargʻona bozori', factor: 0.96, region: 'Fargʻona viloyati' }
];

export const MONTH_NAMES_UZ = [
  'Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 
  'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'
];

export const MONTHS_FULL_UZ = [
  'Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun',
  'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'
];

export const WEEKDAYS_SHORT_UZ = [
  'Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'
];

export function getTodayFormatted() {
  const d = new Date();
  const day = d.getDate();
  const month = MONTHS_FULL_UZ[d.getMonth()];
  const year = d.getFullYear();
  return `${day}-${month}, ${year}`;
}

export function getTodayShortDate() {
  const d = new Date();
  return `${d.getDate()}-${MONTH_NAMES_UZ[d.getMonth()]}`;
}

export function getDayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

/**
 * Returns clean rounded price in UZS
 */
export function cleanRoundUzs(raw) {
  if (raw >= 10000000) {
    return Math.round(raw / 100000) * 100000;
  } else if (raw >= 1000000) {
    return Math.round(raw / 10000) * 10000;
  } else if (raw >= 100000) {
    return Math.round(raw / 1000) * 1000;
  } else if (raw >= 10000) {
    return Math.round(raw / 100) * 100;
  } else {
    return Math.round(raw / 50) * 50;
  }
}

/**
 * Calculates deterministic daily market price for a product on any given day.
 * Incorporates day-of-year so that every single day has authentic market price
 * movement (+/- 1.5% to 3.5%) while remaining strictly stable throughout that day.
 */
export function getProductMarketPrice(basePrice, marketIndex = 0, daysAgo = 0) {
  const mf = MARKET_FACTORS[marketIndex] || MARKET_FACTORS[0];
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const dayNum = getDayOfYear(d) + d.getFullYear() * 365;
  
  // Daily micro-fluctuation factor for market (deterministic for each day)
  const seed = (basePrice % 97) + (marketIndex * 13) + (dayNum * 7);
  const dailyWave = Math.sin(seed * 0.45) * 0.024 + Math.cos(seed * 0.28) * 0.012;
  
  const raw = basePrice * mf.factor * (1 + dailyWave);
  return cleanRoundUzs(raw);
}

export function getDateLabel(daysAgo) {
  if (daysAgo === 0) return 'Bugun';
  if (daysAgo === 1) return 'Kecha';

  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  const day = d.getDate();
  const month = MONTH_NAMES_UZ[d.getMonth()];
  return `${day}-${month}`;
}

/**
 * Generates stable price history going backwards from today's price.
 * For any given day 'k' days ago, the price is deterministic and identical
 * regardless of whether timeframe is 7, 14, 30, or 90 days.
 * Today's price (index = days - 1) is GUARANTEED to be exactly todayPrice.
 */
export function generatePriceSeries(todayPrice, seed = 1, days = 14) {
  const points = [];

  for (let i = days - 1; i >= 0; i--) {
    const daysAgo = i;
    let p = todayPrice;

    if (daysAgo > 0) {
      // Harmonic oscillation with slight realistic drift
      const s = seed + 42;
      const wave = Math.sin((daysAgo + s * 0.7) * 0.42) * 0.038
                 + Math.cos((daysAgo * 0.9 + s)) * 0.018
                 - (daysAgo * 0.0006); // slight historical trend
      const raw = todayPrice * (1 + wave);
      p = cleanRoundUzs(raw);
    }

    points.push({
      val: p,
      daysAgo,
      label: getDateLabel(daysAgo)
    });
  }

  return points;
}
