function testSubmit()
{
  var xhttp = new XMLHttpRequest();
  var msg = "";
  var city = document.getElementById("cityTextBox").value;
  var county = document.getElementById("countyTextBox").value;
  // xhttp.open("GET", "http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/3840?res=3hourly&key=73e6a513-98c3-409e-9655-d705d4508e3d", true)
  xhttp.open("GET", "http://api.airvisual.com/v2/city?city=" + city + "&state=" + county + "&country=UK&key=29ke2AgYZNpT8B4wy", true);
  // xhttp.open("GET", "http://api.airvisual.com/v2/cities?state=" + county + "&country=UK&key=29ke2AgYZNpT8B4wy", true);
  // xhttp.open("GET", "http://api.airvisual.com/v2/states?country=UK&key=29ke2AgYZNpT8B4wy", true);

  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.onreadystatechange = function()
  {
    if (xhttp.readyState === 4)
    {
      if (xhttp.status === 200)
      {
        msg = xhttp.responseText;
        jsonData = JSON.parse(msg);
        pollutionValue = jsonData["data"]["current"]["pollution"]["aqius"];
        console.log(pollutionValue);
        text = document.getElementById("result");
        text.value = "Pollution value: " + pollutionValue + ", this is ";
        if (0 <= pollutionValue <= 50)
        {
          text += "good.";
        }
        else if (51 <= pollutionValue <= 100)
        {
            text += "moderate.";
        }
        else if (101 <= pollutionValue <= 150)
        {
            text += "unhealthy for sensitive groups.";
        }
        else if (151 <= pollutionValue <= 200)
        {
            text += "unhealthy.";
        }
        else if (201 <= pollutionValue <= 300)
        {
            text += "very unhealthy";
        }
        else if (301 <= pollutionValue <= 500)
        {
            text += "hazardous";
        }
      }
      else
      {
        console.error(xhttp.statusText);
        msg = "Error: other wierd response " + xhttp.status;
      }

      try
      {
        document.getElementById("result").innerHTML = msg + "<br>"+document.getElementById("msg").innerHTML;
      } catch (e) { }
      // console.log(msg);
    }
  };
  xhttp.send();
}
