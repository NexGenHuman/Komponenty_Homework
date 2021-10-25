import './App.css';
import PropTypes from 'prop-types';

function GetDistance(longitude1, latitude1, longitude2, latitude2)
{
  if(!isNaN(longitude1) && !isNaN(latitude1) && !isNaN(longitude2) && !isNaN(latitude2))
    {
      let phi = Math.abs(longitude1 - longitude2);
      let lambda = Math.abs(latitude1 - latitude2);

      let a = Math.pow(Math.sin((phi/2)*0.0174532925), 2) + Math.cos(longitude1*0.0174532925) * Math.cos(longitude2*0.0174532925) * Math.pow(Math.sin((lambda/2)*0.0174532925), 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = c * 6371 * 0.539956803;

      return d;
    }
}

class ObjectOnPath
{
  constructor(name, position, dateOfArrival) {
    this.name = name;
    this.position = position;
    this.dateOfArrival = dateOfArrival;
  }
}

class AngleMeasure
{
  constructor(degrees, minutes, seconds, direction)
  {
    this.degrees = degrees;
    this.minutes = minutes;
    this.seconds = seconds;
    this.direction = direction;
  }

  write() {
    return this.degrees + "°" + this.minutes + "′" + this.seconds + "″" + this.direction;
  }
}

class Position
{
  constructor(AngleMeasure1, AngleMeasure2)
  {
    this.AngleMeasure1 = AngleMeasure1;
    this.AngleMeasure2 = AngleMeasure2;
  }
}

class Date
{
  constructor(day, month, year)
  {
    this.day = day;
    this.month = month;
    this.year = year;
  }

  write(){
    return ((this.day < 10 ? '0' : '') + this.day +'.'+(this.month < 10 ? '0' : '') + this.month + '.' + this.year)
  }
}

//-------------------Modified by me, Author: Gabe from stackoverflow
//function ConvertDDToDMS(dd)
//{
//    var deg = dd | 0; // truncate dd to get degrees
//    var frac = Math.abs(dd - deg); // get fractional part
//    var min = (frac * 60) | 0; // multiply fraction by 60 and truncate
//    var sec = Number((frac * 3600 - min * 60).toFixed(0));
//    return deg + "°" + min + "′" + sec + "″";
//}

function ConvertDMSToDD(pos)
{
    var returnValue = pos.degrees;
    returnValue += pos.minutes / 60;
    returnValue += pos.seconds / 3600;
    if(pos.direction === 'W' || pos.direction === 'S')
      returnValue = -returnValue;
    return returnValue;
}

var objectList = [
  new ObjectOnPath("Warsaw", new Position(new AngleMeasure(52, 14, 0, 'N'), new AngleMeasure(21, 1, 0, 'E')), new Date(5, 1, 2022)),
  new ObjectOnPath("Berlin", new Position(new AngleMeasure(52, 31, 12, 'N'), new AngleMeasure(13, 24, 18, 'E')), new Date(7, 2, 2022)),
  new ObjectOnPath("Paris", new Position(new AngleMeasure(48, 51, 23.81, 'N'), new AngleMeasure(2, 21, 8, 'E')), new Date(2, 3, 2022)),
  new ObjectOnPath("London", new Position(new AngleMeasure(51, 30, 26, 'N'), new AngleMeasure(0, 7, 39, 'W')), new Date(12, 4, 2022)),
  new ObjectOnPath("Oslo", new Position(new AngleMeasure(59, 54, 50, 'N'), new AngleMeasure(10, 45, 8, 'E')), new Date(22, 5, 2022))
];

function PrintDistance(position1, position2) {
  var angularPosition1 = ConvertDMSToDD(position1.AngleMeasure1);
  var angularPosition2 = ConvertDMSToDD(position1.AngleMeasure2);
  var angularPosition3 = ConvertDMSToDD(position2.AngleMeasure1);
  var angularPosition4 = ConvertDMSToDD(position2.AngleMeasure2);

  return(
    <td>{Number(GetDistance(angularPosition1, angularPosition2, angularPosition3, angularPosition4)).toFixed(2)} NM</td>
  );
}

function PrintDays(date1, date2)
{
  var tempDay, tempMonth, tempYear;

  tempYear = date1.year - date2.year;

  tempMonth = tempYear * 12;
  tempMonth = tempYear + date1.month - date2.month;

  tempDay = tempMonth * 31;
  tempDay = tempDay + date1.day - date2.day;

  return (
    <td> {tempDay} days</td>
  );
}

function App() {
  //Nie wykonałem wypisywania pętlą ponieważ miałem problem z wyznaczaniem dystansu w pętli
  //Wcześniej udało mi się wykonać wypisywanie za pomocą .map() ale odmierzałem wtedy dystansy przed wypisywaniem
  //To zadanie chciałbym jeszcze poprawić
    return (
      <div className="App">
        <table>
          <tr>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Distance from previous</th>
            <th>Date of arrival</th>
            <th>Days scince last location</th>
          </tr>

            <tr>
              <td>{objectList[0].name}</td>
              <td>{objectList[0].position.AngleMeasure1.write()}</td>
              <td>{objectList[0].position.AngleMeasure2.write()}</td>
              <td>0</td>
              <td>{objectList[0].dateOfArrival.write()}</td>
            </tr>

            <tr>
              <td>{objectList[1].name}</td>
              <td>{objectList[1].position.AngleMeasure1.write()}</td>
              <td>{objectList[1].position.AngleMeasure2.write()}</td>
              {PrintDistance(objectList[0].position, objectList[1].position)}
              <td>{objectList[1].dateOfArrival.write()}</td>
              {PrintDays(objectList[1].dateOfArrival, objectList[0].dateOfArrival)}
            </tr>

            <tr>
              <td>{objectList[2].name}</td>
              <td>{objectList[2].position.AngleMeasure1.write()}</td>
              <td>{objectList[2].position.AngleMeasure2.write()}</td>
              {PrintDistance(objectList[1].position, objectList[2].position)}
              <td>{objectList[2].dateOfArrival.write()}</td>
              {PrintDays(objectList[2].dateOfArrival, objectList[1].dateOfArrival)}
            </tr>

            <tr>
              <td>{objectList[3].name}</td>
              <td>{objectList[3].position.AngleMeasure1.write()}</td>
              <td>{objectList[3].position.AngleMeasure2.write()}</td>
              {PrintDistance(objectList[2].position, objectList[3].position)}
              <td>{objectList[3].dateOfArrival.write()}</td>
              {PrintDays(objectList[3].dateOfArrival, objectList[2].dateOfArrival)}
            </tr>

            <tr>
              <td>{objectList[4].name}</td>
              <td>{objectList[4].position.AngleMeasure1.write()}</td>
              <td>{objectList[4].position.AngleMeasure2.write()}</td>
              {PrintDistance(objectList[3].position, objectList[4].position)}
              <td>{objectList[4].dateOfArrival.write()}</td>
              {PrintDays(objectList[4].dateOfArrival, objectList[3].dateOfArrival)}
            </tr>
        </table>
      </div>
    );
}

export default App;
