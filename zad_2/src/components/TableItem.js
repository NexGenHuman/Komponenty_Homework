import PrintDays from './PrintDays'
import PrintDistance from './PrintDistance'

function TableItem(props) {
    var distance;
    var days;

    if(props.prevObj === null)
    {
        console.log("first created");
        distance = <PrintDistance position1={props.locationObject.position} position2={null}/>;
        days = <td></td>
    } else {
        console.log("other created");
        distance = <PrintDistance position1={props.locationObject.position} position2={props.prevObj.position}/>;
        days = <PrintDays date1={props.locationObject.dateOfArrival} date2={props.prevObj.dateOfArrival}/>
    }

    console.log(props.locationObject.dateOfArrival);
    
    var dateToWrite = props.locationObject.dateOfArrival.getDate() + "/" + props.locationObject.dateOfArrival.getMonth() + "/" + props.locationObject.dateOfArrival.getFullYear();

    return (
        <tr>
          <td> {props.locationObject.name} </td>
          <td> {props.locationObject.position.AngleMeasure1.write()} </td>
          <td> {props.locationObject.position.AngleMeasure2.write()} </td>
          {distance}
          <td> {dateToWrite} </td>
          {days}
        </tr>
      );
}
export default TableItem;
