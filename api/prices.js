module.exports = async (req, res) => {
  try {
    const response = await fetch('https://api.npoint.io/6f5e0f7f6d54b0e6f3ab');
    const data = await response.json();

    res.status(200).json({
      pb95: data.pb95,
      pb98: data.pb98,
      on: data.on,
      lpg: data.lpg
    });

  } catch (e) {
    res.status(200).json({
      pb95: '6.45 zł',
      pb98: '7.15 zł',
      on: '6.65 zł',
      lpg: '3.10 zł'
    });
  }
};
