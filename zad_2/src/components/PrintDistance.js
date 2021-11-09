import PropTypes from "prop-types";
import Position from "../Classes/Position";
import AngleMeasure from "../Classes/AngleMeasure";

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

function ConvertDMSToDD(pos)
{
    console.log(typeof(pos));
    var returnValue = pos.degrees;
    returnValue += pos.minutes / 60;
    returnValue += pos.seconds / 3600;
    if(pos.direction === 'W' || pos.direction === 'S')
      returnValue = -returnValue;
    return returnValue;
}

function PrintDistance(props) {
    if(props.position2 === null)
        return <td>0</td>

    var angularPosition1 = ConvertDMSToDD(props.position1.AngleMeasure1);
    var angularPosition2 = ConvertDMSToDD(props.position1.AngleMeasure2);
    var angularPosition3 = ConvertDMSToDD(props.position2.AngleMeasure1);
    var angularPosition4 = ConvertDMSToDD(props.position2.AngleMeasure2);
  
    return Number(GetDistance(angularPosition1, angularPosition2, angularPosition3, angularPosition4)).toFixed(2) + " NM";
}

PrintDistance.propTypes={
  position1: PropTypes.isRequired,
  position2: PropTypes.isRequired
}

PrintDistance.defaultProps={
  position1: new Position(new AngleMeasure(0, 0, 0, 'N'), new AngleMeasure(0, 0, 0, 'E')),
  position2: new Position(new AngleMeasure(0, 0, 0, 'N'), new AngleMeasure(0, 0, 0, 'E'))
}

export default PrintDistance;