export default async function handler(req, res) {
  try {
    const response = await fetch('https://api.allorigins.win/raw?url=https://www.autocentrum.pl/paliwa/ceny-paliw/');
    
    const html = await response.text();

    function findPrice(label) {
      const regex = new RegExp(label + '[^0-9]*([0-9],[0-9]{2})');
      const match = html.match(regex);
      return match ? match[1] + ' zł' : 'brak';
    }

    res.status(200).json({
      pb95: findPrice('PB95'),
      pb98: findPrice('PB98'),
      diesel: findPrice('ON'),
      lpg: findPrice('LPG')
    });

  } catch (e) {
    res.status(500).json({
      error: 'Failed to fetch prices'
    });
  }
}