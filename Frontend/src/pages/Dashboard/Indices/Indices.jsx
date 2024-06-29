import Table from "../Datasets/Table";
import EditIndexModal from "./EditIndexModal";

const header = ["Index", "Index Name", "Threshold", "Actions"];

const data = [
  ["TXx", "Maximum of Daily Maximum Temperature", "50"],
  ["TNx", "Maximum of Daily Minimum Temperature", "50"],
  ["TXn", "Minimum of Daily Maximum Temperature", "50"],
  ["TNn", "Minimum of Daily Minimum Temperature", "50"],
  ["TN10p", "Cold Nights (10th Percentile)", "50"],
  ["TN90p", "Warm Nights (90th Percentile)", "50"],
  ["TX10p", "Cool Days (10th Percentile)", "50"],
  ["TX90p", "Hot Days (90th Percentile)", "50"],
  ["WSDI", "Warm Spell Duration Indicator", "50"],
  ["CSDI", "Cold Spell Duration Indicator", "50"],
  ["DTR", "Daily Temperature Range", "50"],
  ["ETR", "Extreme Temperature Range", "50"],
  ["GDDgrown", "Growing Degree Days", "50"],
  ["HDDheatn", "Heating Degree Days", "50"],
  ["CDDcoldn", "Cooling Degree Days", "50"],
  ["CDD", "Consecutive Dry Days", "50"],
  ["TMge5", "Days with Mean Temp > 5th Percentile", "50"],
  ["TMge10", "Days with Mean Temp > 10th Percentile", "50"],
  ["TMlt5", "Days with Mean Temp < 5th Percentile", "50"],
  ["TMlt10", "Days with Mean Temp < 10th Percentile", "50"],
  ["TMm", "Mean of Daily Mean Temperature", "50"],
  ["TXm", "Mean of Daily Maximum Temperature", "50"],
  ["TNm", "Mean of Daily Minimum Temperature", "50"],
  ["TXge30", "Days with Max Temp > 30°C", "50"],
  ["TXge35", "Days with Max Temp > 35°C", "50"],
  ["TXgt50p", "Days with Max Temp > 50th Percentile", "50"],
  ["TNlt2", "Days with Min Temp < 2°C", "50"],
  ["TNltm2", "Days with Min Temp < -2°C", "50"],
  ["TNltm20", "Days with Min Temp < -20°C", "50"],
]

export default function Indices() {

  return (
    <div className="indices">
      <h1>Indices</h1>
      <p>View and edit indices threshold</p>
      <Table data={data} header={header} actions={<EditIndexModal />} />
    </div>
  );
}
