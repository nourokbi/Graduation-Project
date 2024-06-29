// import UploadModalForm from "./UploadFormModal";
import DeleteModal from "./DeleteModal";
import EditFormModal from "./EditFormModal";
import Table from "./Table";
import UploadFormModal from "./UploadFormModal";

const header = ["Dataset Name", "Type", "Author", "Actions"];

const data = [
  ["Dataset 1", "Tempreture", "Admin"],
  ["Dataset 2", "Percitipation", "Admin"],
  ["Dataset 3", "Tempreture", "Admin"],
  ["Dataset 4", "Percitipation", "Analyst1"],
  ["Dataset 5", "Tempreture", "Analyst1"],
  ["Dataset 6", "Percitipation", "Analyst2"],
  ["Dataset 7", "Tempreture", "Analyst2"],
  ["Dataset 8", "Heat Waves", "Admin"],
  ["Dataset 9", "Tempreture", "Analyst3"],
  ["Dataset 10", "Percitipation", "Admin2"],
];

const actions = <> 
  <EditFormModal />
  <DeleteModal />
</>

export default function Datasets() {
  return (
    <div className="dataset-container">
      <div className="dataset-head">
        <div className="content">
          <h1>Datasets</h1>
          <p>here you can upload, edit or delete your datasets</p>
        </div>
        <div className="upload-form">
          <UploadFormModal />
        </div>
      </div>
      <Table data={data} actions={actions} header={header} />
    </div>
  );
}
