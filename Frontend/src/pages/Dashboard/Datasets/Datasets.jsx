import UploadModalForm from "./UploadFormModal";
import Table from "./Table";

export default function Datasets() {
  return (
    <div className="dataset-container">
      <div className="dataset-head">
        <div className="content">
          <h1>Datasets</h1>
          <p>here you can upload, edit or delete your datasets</p>
        </div>
        <div className="upload-form">
          <UploadModalForm />
        </div>
      </div>
      <Table />
    </div>
  );
}
