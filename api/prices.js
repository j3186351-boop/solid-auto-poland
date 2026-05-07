module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.autocentrum.pl/paliwa/ceny-paliw/');
    const html = await response.text();

    const prices = [...html.matchAll(/([0-9],[0-9]{2})/g)]
      .map(m => m[1]);

    res.status(200).json({
      pb95: prices[0] ? prices[0] + ' zł' : '6.45 zł',
      pb98: prices[1] ? prices[1] + ' zł' : '7.10 zł',
      on: prices[2] ? prices[2] + ' zł' : '6.60 zł',
      lpg: prices[3] ? prices[3] + ' zł' : '3.05 zł'
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
