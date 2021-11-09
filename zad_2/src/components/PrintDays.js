import PropTypes from "prop-types";

function PrintDays(props)
{
  var Difference_In_Time = props.date1.getTime() - props.date2.getTime();
  
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  return (
      <td>{Number(Difference_In_Days).toFixed(0)} days</td>
  );
}

PrintDays.propTypes={
  date1: PropTypes.isRequired,
  date2: PropTypes.isRequired
}

export default PrintDays;