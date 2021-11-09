import './App.css';
import TableItem from './components/TableItem'
import ObjectOnPath from './Classes/ObjectOnPath';
import Position from './Classes/Position';
import AngleMeasure from './Classes/AngleMeasure';

var objectList = [
  new ObjectOnPath("Warsaw", new Position(new AngleMeasure(52, 14, 0, 'N'), new AngleMeasure(21, 1, 0, 'E')), new Date('2022-1-5')),
  new ObjectOnPath("Berlin", new Position(new AngleMeasure(52, 31, 12, 'N'), new AngleMeasure(13, 24, 18, 'E')), new Date('2022-2-7')),
  new ObjectOnPath("Paris", new Position(new AngleMeasure(48, 51, 23.81, 'N'), new AngleMeasure(2, 21, 8, 'E')), new Date('2022-3-2')),
  new ObjectOnPath("London", new Position(new AngleMeasure(51, 30, 26, 'N'), new AngleMeasure(0, 7, 39, 'W')), new Date('2022-4-12')),
  new ObjectOnPath("Oslo", new Position(new AngleMeasure(59, 54, 50, 'N'), new AngleMeasure(10, 45, 8, 'E')), new Date('2022-5-22'))
];

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

          {objectList.map((_location, index) => {
            if(index === 0)
              return <TableItem locationObject={_location} prevObj={null}/>
            else
              return <TableItem locationObject={_location} prevObj={objectList[index - 1]}/>
          })}

        </table>
      </div>
    );
}

export default App;
