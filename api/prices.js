export default async function handler(req, res) {
  try {
    const response = await fetch('https://pl.fuelo.net/?lang=en');
    const html = await response.text();

    function extract(label){
      const regex = new RegExp(label + '[\\s\\S]*?<h3>(.*?) PLN','i');
      const match = html.match(regex);
      return match ? match[1].trim() + ' zł' : 'N/A';
    }

    res.status(200).json({
      pb95: extract('Unleaded 95'),
      pb98: extract('Unleaded 98'),
      on: extract('Diesel'),
      lpg: extract('LPG')
    });

  } catch (e) {
    res.status(500).json({error:'Failed'});
  }
}
