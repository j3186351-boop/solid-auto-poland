module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.autocentrum.pl/paliwa/ceny-paliw/');
    const html = await response.text();

    function getPrice(name) {
      const regex = new RegExp(name + '[\\s\\S]*?([0-9],[0-9]{2})', 'i');
      const match = html.match(regex);
      return match ? match[1] + ' zł' : '—';
    }

    res.status(200).json({
      pb95: getPrice('PB95'),
      pb98: getPrice('PB98'),
      on: getPrice('ON'),
      lpg: getPrice('LPG')
    });

  } catch (e) {
    res.status(200).json({
      pb95: '6.45 zł',
      pb98: '7.10 zł',
      on: '6.60 zł',
      lpg: '3.05 zł'
    });
  }
};
