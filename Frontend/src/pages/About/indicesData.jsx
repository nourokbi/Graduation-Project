const tempIndices = [
  {
    id: 'fd',
    name: 'FD',
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &lt; 0°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &lt; 0°C.
        </p>
      </div>
    )
  },
  {
    id: 'su',
    name: 'SU',
    description: (
      <div>
        <p className="important">Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 25°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 25°C.
        </p>
      </div>
    )
  },
  {
    id: 'id',
    name: 'ID',
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &lt; 0°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &lt; 0°C.
        </p>
      </div>
    )
  },
  {
    id: 'tr',
    name: 'TR',
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &gt; 20°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &gt; 20°C.
        </p>
      </div>
    )
  },
  {
    id: 'gsl',
    name: 'GSL',
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 5°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 5°C.
        </p>
      </div>
    )
  },
  {
    id: 'txx',
    name: 'TXx',
    description: (
      <div>
        <p>Annual maximum of daily maximum temperature.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the maximum value of <em>TX<sub>ij</sub></em> for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: 'tnx',
    name: 'TNx',
    description: (
      <div>
        <p>Annual maximum of daily minimum temperature.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the maximum value of <em>TN<sub>ij</sub></em> for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: 'txn',
    name: 'TXn',
    description: (
      <div>
        <p>Annual minimum of daily maximum temperature.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the minimum value of <em>TX<sub>ij</sub></em> for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: 'tnn',
    name: 'TNn',
    description: (
      <div>
        <p>Annual minimum of daily minimum temperature.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the minimum value of <em>TN<sub>ij</sub></em> for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: 'tn10p',
    name: 'TN10p',
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &lt; 10th percentile.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &lt; 10th percentile.
        </p>
      </div>
    )
  },
  {
    id: 'tx10p',
    name: 'TX10p',
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &lt; 10th percentile.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &lt; 10th percentile.
        </p>
      </div>
    )
  },
  {
    id: 'tn90p',
    name: 'TN90p',
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &gt; 90th percentile.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &gt; 90th percentile.
        </p>
      </div>
    )
  },
  {
    id: 'tx90p',
    name: 'TX90p',
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 90th percentile.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 90th percentile.
        </p>
      </div>
    )
  },
  {
    id: "wsdi",
    name: "WSDI",
    description: (
      <div>
        <p>Warm Spell Duration Index</p>
        <p>
          The Warm Spell Duration Index (WSDI) is defined as the annual count of days when TX (daily maximum temperature) &gt; 90th percentile.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TX<sub>ij</sub> &gt; 90th percentile.
        </p>
      </div>
    )
  },
  {
    id: "csdi",
    name: "CSDI",
    description: (
      <div>
        <p>Cold Spell Duration Index</p>
        <p>
          The Cold Spell Duration Index (CSDI) is defined as the annual count of days when TN (daily minimum temperature) &lt; 10th percentile.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TN<sub>ij</sub> &lt; 10th percentile.
        </p>
      </div>
    )
  },
  {
    id: "dtr",
    name: "DTR",
    description: (
      <div>
        <p>Diurnal Temperature Range</p>
        <p>
          The Diurnal Temperature Range (DTR) is defined as the annual average of daily maximum temperature minus daily minimum temperature.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Calculate the daily difference between TX<sub>ij</sub> and TN<sub>ij</sub> for each day i in year j.
        </p>
        <p>
          Calculate the annual average of these daily differences.
        </p>
      </div>
    )
  },
  {
    id: "etr",
    name: "ETR",
    description: (
      <div>
        <p>Extreme Temperature Range</p>
        <p>
          The Extreme Temperature Range (ETR) is defined as the annual maximum of daily maximum temperature minus the annual minimum of daily minimum temperature.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Calculate the daily difference between TX<sub>ij</sub> and TN<sub>ij</sub> for each day i in year j.
        </p>
        <p>
          Calculate the annual maximum of these daily differences.
        </p>
      </div>
    )
  },
  {
    id:"cddcoldn",
    name:"CDDcoldn",
    description:(
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &lt; 5°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &lt; 5°C.
        </p>
      </div>
    )
  },
  {
    id: "gddgrown",
    name: "GDDgrown",
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 5°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 5°C.
        </p>
      </div>
    )
  },
  {
    id: "hddheatn",
    name: "HDDheatn",
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &gt; 18°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &gt; 18°C.
        </p>
      </div>
    )
  },
  {
    id: "tmge5",
    name: "TMge5",
    description: (
      <div>
        <p>Annual count of days when <em>TM</em> (daily mean temperature) &gt; 5°C.</p>
        <p>
          Let <em>TM<sub>ij</sub></em> be the daily mean temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TM<sub>ij</sub></em> &gt; 5°C.
        </p>
      </div>
    )
  },
  {
    id: "tmlt5",
    name: "TMlt5",
    description: (
      <div>
        <p>Annual count of days when <em>TM</em> (daily mean temperature) &lt; 5°C.</p>
        <p>
          Let <em>TM<sub>ij</sub></em> be the daily mean temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TM<sub>ij</sub></em> &lt; 5°C.
        </p>
      </div>
    )
  },
  {
    id: "tmge10",
    name: "TMge10",
    description: (
      <div>
        <p>Annual count of days when <em>TM</em> (daily mean temperature) &gt; 10°C.</p>
        <p>
          Let <em>TM<sub>ij</sub></em> be the daily mean temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TM<sub>ij</sub></em> &gt; 10°C.
        </p>
      </div>
    )
  },
  {
    id: "tmlt10",
    name: "TMlt10",
    description: (
      <div>
        <p>Annual count of days when <em>TM</em> (daily mean temperature) &lt; 10°C.</p>
        <p>
          Let <em>TM<sub>ij</sub></em> be the daily mean temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TM<sub>ij</sub></em> &lt; 10°C.
        </p>
      </div>
    )
  },
  {
    id: "tmm",
    name: "TMm",
    description: (
      <div>
        <p>Annual average of daily mean temperature.</p>
        <p>
          Let <em>TM<sub>ij</sub></em> be the daily mean temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the annual average of <em>TM<sub>ij</sub></em>.
        </p>
      </div>
    )
  },
  {
    id: "txm",
    name: "TXm",
    description: (
      <div>
        <p>Annual average of daily maximum temperature.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the annual average of <em>TX<sub>ij</sub></em>.
        </p>
      </div>
    )
  },
  {
    id: "tnm",
    name: "TNm",
    description: (
      <div>
        <p>Annual average of daily minimum temperature.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the annual average of <em>TN<sub>ij</sub></em>.
        </p>
      </div>
    )
  },
  {
    id: "txge30",
    name: "TXge30",
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 30°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 30°C.
        </p>
      </div>
    )
  },
  {
    id: "txge35",
    name: "TXge35",
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 35°C.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 35°C.
        </p>
      </div>
    )
  },
  {
    id: "txgt50p",
    name: "TXgt50p",
    description: (
      <div>
        <p>Annual count of days when <em>TX</em> (daily maximum temperature) &gt; 50th percentile.</p>
        <p>
          Let <em>TX<sub>ij</sub></em> be the daily maximum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TX<sub>ij</sub></em> &gt; 50th percentile.
        </p>
      </div>
    )
  },
  {
    id: "tnlt2",
    name: "TNlt2",
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &lt; 2°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &lt; 2°C.
        </p>
      </div>
    )
  },
  {
    id:"tnltm2",
    name:"TNltm2",
    description:(
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &lt; -2°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &lt; -2°C.
        </p>
      </div>
    )
  },
  {
    id: "tnltm20",
    name: "TNltm20",
    description: (
      <div>
        <p>Annual count of days when <em>TN</em> (daily minimum temperature) &lt; -20°C.</p>
        <p>
          Let <em>TN<sub>ij</sub></em> be the daily minimum temperature on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>TN<sub>ij</sub></em> &lt; -20°C.
        </p>
      </div>
    )
  }
]

const precipIndices = [
  {
    id: 'rx1day',
    name: 'RX1day',
    description: (
      <div>
        <p>Annual maximum 1-day precipitation.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the maximum value of <em>RR<sub>ij</sub></em> for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: "rx5day",
    name: "RX5day",
    description: (
      <div>
        <p>Annual maximum 5-day precipitation.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Find the maximum total precipitation over any 5-day period for each year <em>j</em>.
        </p>
      </div>
    )
  },
  {
    id: "spi",
    name: "SPI",
    description: (
      <div>
        <p>Standardized Precipitation Index</p>
        <p>
          The Standardized Precipitation Index (SPI) is a drought index that represents the precipitation deficit for different time scales.
        </p>
        <p>
          The SPI is calculated using the gamma distribution function.
        </p>
        <p>
          The SPI is standardized to have a mean of 0 and a standard deviation of 1.
        </p>
      </div>
    )
  },
  {
    id: "spei",
    name: "SPEI",
    description: (
      <div>
        <p>Standardized Precipitation Evapotranspiration Index</p>
        <p>
          The Standardized Precipitation Evapotranspiration Index (SPEI) is a drought index that represents the precipitation deficit for different time scales, accounting for evapotranspiration.
        </p>
        <p>
          The SPEI is calculated using the gamma distribution function.
        </p>
        <p>
          The SPEI is standardized to have a mean of 0 and a standard deviation of 1.
        </p>
      </div>
    )
  },
  {
    id: "sdii",
    name: "SDII",
    description: (
      <div>
        <p>Simple Daily Intensity Index</p>
        <p>
          The Simple Daily Intensity Index (SDII) is defined as the annual total precipitation divided by the number of wet days.
        </p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>RR<sub>ij</sub></em> &gt; 1 mm.
        </p>
        <p>
          Calculate the annual total precipitation.
        </p>
        <p>
          Divide the annual total precipitation by the number of wet days.
        </p>
      </div>
    )
  },
  {
    id: "r10mm",
    name: "R10mm",
    description: (
      <div>
        <p>Annual count of days when daily precipitation &gt; 10 mm.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>RR<sub>ij</sub></em> &gt; 10 mm.
        </p>
      </div>
    )
  },{
    id: "r20mm",
    name: "R20mm",
    description: (
      <div>
        <p>Annual count of days when daily precipitation &gt; 20 mm.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of days where <em>RR<sub>ij</sub></em> &gt; 20 mm.
        </p>
      </div>
    )
  }, {
    id: "cdd",
    name: "CDD",
    description: (
      <div>
        <p>Annual count of consecutive dry days.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of consecutive days where <em>RR<sub>ij</sub></em> &lt; 1 mm.
        </p>
      </div>
    )
  },
  {
    id: "cwd",
    name: "CWD",
    description: (
      <div>
        <p>Annual count of consecutive wet days.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Count the number of consecutive days where <em>RR<sub>ij</sub></em> &gt; 1 mm.
        </p>
      </div>
    )
  }, {
    id: "r95p",
    name: "R95p",
    description: (
      <div>
        <p>Annual total precipitation from days when daily precipitation &gt; 95th percentile.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the 95th percentile of daily precipitation.
        </p>
        <p>
          Sum the daily precipitation where <em>RR<sub>ij</sub></em> &gt; 95th percentile.
        </p>
      </div>
    )
  },{ 
    id: "r99p",
    name: "R99p",
    description: (
      <div>
        <p>Annual total precipitation from days when daily precipitation &gt; 99th percentile.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the 99th percentile of daily precipitation.
        </p>
        <p>
          Sum the daily precipitation where <em>RR<sub>ij</sub></em> &gt; 99th percentile.
        </p>
      </div>
    )
  }, {
    id: "r95ptot",
    name: "R95ptot",
    description: (
      <div>
        <p>Annual total precipitation from days when daily precipitation &gt; 95th percentile.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the 95th percentile of daily precipitation.
        </p>
        <p>
          Sum the daily precipitation where <em>RR<sub>ij</sub></em> &gt; 95th percentile.
        </p>
      </div>
    )
  }, {
    id: "r99ptot",
    name: "R99ptot",
    description: (
      <div>
        <p>Annual total precipitation from days when daily precipitation &gt; 99th percentile.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the 99th percentile of daily precipitation.
        </p>
        <p>
          Sum the daily precipitation where <em>RR<sub>ij</sub></em> &gt; 99th percentile.
        </p>
      </div>
    )
  },
  {
    id: "prcptot",
    name: "PRCPTOT",
    description: (
      <div>
        <p>Annual total precipitation.</p>
        <p>
          Let <em>RR<sub>ij</sub></em> be the daily precipitation on day <em>i</em> in year <em>j</em>.
        </p>
        <p>
          Calculate the annual total precipitation.
        </p>
      </div>
    )
  }
]

const wavesIndices = [
  {
    id: "hwn",
    name: "HWN",
    description: (
      <div>
        <p>Heat Wave Duration Index</p>
        <p>
          The Heat Wave Duration Index (HWN) is defined as the annual count of days when TX (daily maximum temperature) &gt; 90th percentile for at least 6 consecutive days.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TX<sub>ij</sub> &gt; 90th percentile for at least 6 consecutive days.
        </p>
      </div>
    )
  }, {
    id: "hwf",
    name: "HWF",
    description: (
      <div>
        <p>Heat Wave Frequency Index</p>
        <p>
          The Heat Wave Frequency Index (HWF) is defined as the annual count of heat waves.
        </p>
        <p>
          A heat wave is defined as at least 3 consecutive days where TX (daily maximum temperature) &gt; 90th percentile.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Count the number of heat waves for each year j.
        </p>
      </div>
    )
  }, {
    id: "hwd",
    name: "HWD",
    description: (
      <div>
        <p>Heat Wave Magnitude Index</p>
        <p>
          The Heat Wave Magnitude Index (HWD) is defined as the annual sum of daily maximum temperature during heat waves.
        </p>
        <p>
          A heat wave is defined as at least 3 consecutive days where TX (daily maximum temperature) &gt; 90th percentile.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Calculate the sum of TX<sub>ij</sub> for each heat wave.
        </p>
      </div>
    )
  }, {
    id: "hwn",
    name: "HWN",
    description: (
      <div>
        <p>Heat Wave Duration Index</p>
        <p>
          The Heat Wave Duration Index (HWN) is defined as the annual count of days when TX (daily maximum temperature) &gt; 90th percentile for at least 6 consecutive days.
        </p>
        <p>
          Let TX<sub>ij</sub> be the daily maximum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TX<sub>ij</sub> &gt; 90th percentile for at least 6 consecutive days.
        </p>
      </div>
    )
  }, {
    id: "cwn_ecf",
    name: "CWN_ECF",
    description: (
      <div>
        <p>Cold Wave Duration Index</p>
        <p>
          The Cold Wave Duration Index (CWN_ECF) is defined as the annual count of days when TN (daily minimum temperature) &lt; 10th percentile for at least 6 consecutive days.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TN<sub>ij</sub> &lt; 10th percentile for at least 6 consecutive days.
        </p>
      </div>
    )
  }, {
    id: "cwf_ecf",
    name: "CWF_ECF",
    description: (
      <div>
        <p>Cold Wave Frequency Index</p>
        <p>
          The Cold Wave Frequency Index (CWF_ECF) is defined as the annual count of cold waves.
        </p>
        <p>
          A cold wave is defined as at least 3 consecutive days where TN (daily minimum temperature) &lt; 10th percentile.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Count the number of cold waves for each year j.
        </p>
      </div>
    )
  }, {
    id: "cwd_ecf",
    name: "CWD_ECF",
    description: (
      <div>
        <p>Cold Wave Duration Index</p>
        <p>
          The Cold Wave Duration Index (CWD_ECF) is defined as the annual count of days when TN (daily minimum temperature) &lt; 10th percentile for at least 6 consecutive days.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Count the number of days where TN<sub>ij</sub> &lt; 10th percentile for at least 6 consecutive days.
        </p>
      </div>
    )
  }, {
    id: "cwm_ecf",
    name: "CWM_ECF",
    description: (
      <div>
        <p>Cold Wave Magnitude Index</p>
        <p>
          The Cold Wave Magnitude Index (CWM_ECF) is defined as the annual sum of daily minimum temperature during cold waves.
        </p>
        <p>
          A cold wave is defined as at least 3 consecutive days where TN (daily minimum temperature) &lt; 10th percentile.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Calculate the sum of TN<sub>ij</sub> for each cold wave.
        </p>
      </div>
    )
  }, {
    id:"cwa_ecf",
    name:"CWA_ECF",
    description:(
      <div>
        <p>Cold Wave Amplitude Index</p>
        <p>
          The Cold Wave Amplitude Index (CWA_ECF) is defined as the annual average of daily minimum temperature during cold waves.
        </p>
        <p>
          A cold wave is defined as at least 3 consecutive days where TN (daily minimum temperature) &lt; 10th percentile.
        </p>
        <p>
          Let TN<sub>ij</sub> be the daily minimum temperature on day i in year j.
        </p>
        <p>
          Calculate the average of TN<sub>ij</sub> for each cold wave.
        </p>
      </div>
    )
  }
]

export {tempIndices, precipIndices, wavesIndices};