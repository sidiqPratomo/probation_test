import { Content } from "../../../_metronic/layout/components/content";
import { useState } from "react";
import { MultiValue } from "react-select";
import { countryOptions } from "../../../docs/data";
import { FileModel } from "../../../base_models/FileModel";
import { SelectOption } from "../../../base_models/SelectOption";
import { MultiUploadFiles } from "../../../components/input/file_uploads/MultiUploadFiles";
import { MultiUploadWithList } from "../../../components/input/file_uploads/MultiUploadWithList";
import { MultiUploadImage } from "../../../components/input/file_uploads/MultiUploadImage";
import { SingleUploadImage } from "../../../components/input/file_uploads/SingleUploadImage";
import { DateRangePicker } from "../../../components/input/date_picker/DateRangePicker";
import { YearSelect } from "../../../components/input/date_picker/YearSelect";
import { MonthSelect } from "../../../components/input/date_picker/MonthSelect";
import { useModalContext } from "../../../context/ModalContext";
import { Button } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { ToolbarWrapper } from "../../../_metronic/layout/components/toolbar";
import { DatePicker, SelectReference } from "../../../components";
import { SelectPaginate } from "../../../components/input/SelectPaginate";
import { MonthYearPicker } from "../../../components/input/date_picker/MonthYearPicker";
import { Checkbox } from "../../../components/input/Checkbox";
import { OptionModel } from "../../../base_models/OptionModel";
import { MultipleSelect } from "../../../components/input/select_options/MultipleSelect";
import { SingleSelect } from "../../../components/input/select_options/Select";
import { UploadFile } from "../../../components/input/file_uploads/UploadFile";

const ProductList = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("MY");
  const [selectedValues, setSelectedValues] = useState<string[] | undefined>([
    "TH",
    "KH",
  ]);
  // const [selectedAsianCountry, setSelectedAsianCountry] = useState<string>('VN')
  // const [collectionAsianCountry, setCollectionAsianCountry] = useState<string[] | undefined>(["JP", "SG"])
  const [province, setProvince] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [boxValue, setBoxValue] = useState<boolean>(false);
  const [singleFile, setSingleFile] = useState<FileModel>({
    bucket: "files",
    path: "20240222/topsecret",
    mime: "image/jpeg",
    filename: "pexels-dmitry-zvolskiy-2062424.jpg",
  });
  const [multipleFiles, setMultipleFiles] = useState<FileModel[]>([
    {
      bucket: "multiple",
      path: "20240222/sagara",
      mime: "application/pdf",
      filename: "documents copy.pdf",
    },
    {
      bucket: "multiple",
      path: "20240222/sagara",
      mime: "application/pdf",
      filename: "documents.pdf",
    },
  ]);
  const [dateState, setDateState] = useState<string>("2001-11-09");
  const [dateRangeState, setDateRangeState] = useState({
    start: "2024-02-01",
    end: "2024-02-22",
  });
  const [yearValue, setYearValue] = useState<string>("2021");
  const [monthValue, setMonthValue] = useState<string>("9");
  const [paginateSelectValue, setPaginateSelectValue] =
    useState<OptionModel | null>({
      value: "8",
      label: "Microsoft Surface Laptop 4",
    });
  const [monthYearValue, setMonthYearValue] = useState<string>("2024-01");

  const modal = useModalContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleMultipleSelectChange = (newValue: MultiValue<SelectOption>) => {
    const selectedValueArray = newValue
      ? (newValue as SelectOption[]).map((option) => option.value)
      : [];
    setSelectedValues(selectedValueArray);
  };

  // const handleLazyMultipleSelectChange = (
  //   newValue: MultiValue<SelectOption>
  // ) => {
  //   const selectedValueArray = newValue ? (newValue as SelectOption[]).map((option) => option.value) : [];
  //   setCollectionAsianCountry(selectedValueArray);
  // };

  const handleSelectChange = (newValue: SelectOption | null) => {
    const selected = newValue ? newValue.value : null;
    if (selected) setSelectedCountry(selected);
  };

  const handleSelectYearChange = (newValue: SelectOption | null) => {
    const selected = newValue ? newValue.value : null;
    if (selected) setYearValue(selected);
  };

  const handleSelectMonthChange = (newValue: SelectOption | null) => {
    const selected = newValue ? newValue.value : null;
    if (selected) setMonthValue(selected);
  };

  // const handleLazyChange = (newValue: SelectOption | null) => {
  //   const selected = newValue ? newValue.value : null
  //   if (selected) setSelectedAsianCountry(selected)
  // }

  const handlePaginateChange = (selectedOption: OptionModel | null) => {
    setPaginateSelectValue(selectedOption);
  };

  const handleProvince = (selectedOption: string) => {
    if (selectedOption) {
      setProvince(selectedOption);
      setCity("");
    }
  };

  const handleCity = (selectedOption: string) => {
    if (selectedOption) {
      setCity(selectedOption);
    }
  };

  const handleSingleFileChange = (file: FileModel) => {
    setSingleFile(file);
  };

  const handleMultipleFilesChange = (files: FileModel[]) => {
    setMultipleFiles(files);
  };

  const handleDateChange = (date: string) => {
    setDateState(date);
    // Perform any other necessary actions with the selected date
  };

  const handleMonthYearChange = (value: string) => {
    setMonthYearValue(value);
  };

  const handleRangeDateChange = (startDate: string, endDate: string) => {
    setDateRangeState((prevState) => ({
      ...prevState,
      start: startDate,
      end: endDate,
    }));
  };

  const handleShowModal = async () => {
    const response = await modal.showConfirmation(
      "Modal Opened",
      "This is message of modal"
    );
    if (response) {
      enqueueSnackbar({
        variant: "success",
        message: "You successfully click a button",
      });
    }

    return false;
  };

  const handleCheckbox = (isChecked: boolean) => {
    setBoxValue(isChecked);
  };

  return (
    <>
      <ToolbarWrapper />
      <Content>
        {/* <div className="d-flex justify-content-between align-items-center mb-5">
          <h1>Component Showcase</h1>
        </div> */}
        <div className="row g-5">
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h4 className="card-title">Single Select</h4>
              </div>
              <div className="card-body">
                <SingleSelect
                  options={countryOptions}
                  label="Select country"
                  isRequired={true}
                  changeHandler={handleSelectChange}
                  value={selectedCountry}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{selectedCountry}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Multiple Select</h3>
              </div>
              <div className="card-body">
                <MultipleSelect
                  options={countryOptions}
                  label="Pilih negara"
                  isRequired={true}
                  changeHandler={handleMultipleSelectChange}
                  value={selectedValues}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(selectedValues)}</p>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Single Lazy Select</h3>
              </div>
              <div className="card-body">
                <LazySelect
                  label="Select Asian Country"
                  isRequired={true}
                  options={asianCountryOptions}
                  changeHandler={handleLazyChange}
                  value={selectedAsianCountry}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{selectedAsianCountry}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Multiple Lazy Select</h3>
              </div>
              <div className="card-body">
                <LazyMultiSelect
                  label="Select Asian Country"
                  isRequired={true}
                  options={asianCountryOptions}
                  changeHandler={handleLazyMultipleSelectChange}
                  value={collectionAsianCountry}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(collectionAsianCountry)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Lazy Fetching Select</h3>
              </div>
              <div className="card-body">
                <LazyFetchingSelect
                  label="Select Products"
                  isRequired={true}
                  changeHandler={handleLazyFetchingSelectChange}
                />
              </div>
            </div>
          </div> */}
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Single Upload File</h3>
              </div>
              <div className="card-body">
                <UploadFile
                  label="Upload file"
                  path="topsecret"
                  onFileChange={handleSingleFileChange}
                  initialFile={singleFile}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(singleFile)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Multi Upload Files</h3>
              </div>
              <div className="card-body">
                <MultiUploadFiles
                  label="Select files"
                  bucket="multiple"
                  path="sagara"
                  onFileChange={handleMultipleFilesChange}
                  initialFiles={multipleFiles}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(multipleFiles)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Basic DatePicker</h3>
              </div>
              <div className="card-body">
                <DatePicker
                  label="Select Date"
                  placeholder="Pick A Date"
                  onChange={handleDateChange}
                  value={dateState}
                  options={{
                    altInput: true,
                    altFormat: "j F, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{dateState}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Date Range Picker</h3>
              </div>
              <div className="card-body">
                <DateRangePicker
                  value={dateRangeState}
                  label="Select Date Range"
                  onChange={handleRangeDateChange}
                  options={{
                    // minDate: 'today',
                    altInput: true,
                    altFormat: "j F, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(dateRangeState)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">SelectYear</h3>
              </div>
              <div className="card-body">
                <YearSelect
                  label="Select Year"
                  value={yearValue}
                  startYear={2015}
                  endYear={2025}
                  onChange={handleSelectYearChange}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{yearValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">SelectMonth</h3>
              </div>
              <div className="card-body">
                <MonthSelect
                  label="Select Months"
                  onChange={handleSelectMonthChange}
                  value={monthValue}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{monthValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Modal</h3>
              </div>
              <div className="card-body">
                <Button variant="info" onClick={handleShowModal}>
                  Show Modal
                </Button>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Multi Upload File With Listing</h3>
              </div>
              <div className="card-body">
                <div className="multi_upload-file">
                  <MultiUploadWithList
                    label="Select files"
                    bucket="multiple"
                    path="sagara"
                    onFileChange={handleMultipleFilesChange}
                    initialFiles={multipleFiles}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Multi Upload Image</h3>
              </div>
              <div className="card-body">
                <MultiUploadImage
                  label="Select Image"
                  bucket="multiple"
                  path="sagara"
                  onFileChange={handleMultipleFilesChange}
                  initialFiles={multipleFiles}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card h-100">
              <div className="card-header">
                <h3 className="card-title">Single Upload Image</h3>
              </div>
              <div className="card-body">
                <SingleUploadImage
                  label="Select Image"
                  bucket="multiple"
                  path="sagara"
                  // onFileChange={handleMultipleFilesChange}
                  // initialFiles={multipleFiles}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Multiple Select</h3>
            </div>
            <div className="card-body">
              <MultipleSelect
                options={countryOptions}
                label="Pilih negara"
                isRequired={true}
                changeHandler={handleMultipleSelectChange}
                value={selectedValues}
              />
              <div>
                <h6>Output:</h6>
                <p>{JSON.stringify(selectedValues)}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Single Upload File</h3>
              </div>
              <div className="card-body">
                <UploadFile
                  label="Upload file"
                  path="topsecret"
                  onFileChange={handleSingleFileChange}
                  initialFile={singleFile}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(singleFile)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Multi Upload Files</h3>
              </div>
              <div className="card-body">
                <MultiUploadFiles
                  label="Select files"
                  bucket="multiple"
                  path="sagara"
                  onFileChange={handleMultipleFilesChange}
                  initialFiles={multipleFiles}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(multipleFiles)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Basic DatePicker</h3>
              </div>
              <div className="card-body">
                <DatePicker
                  label="Select Date"
                  placeholder="Pick A Date"
                  onChange={handleDateChange}
                  value={dateState}
                  options={{
                    altInput: true,
                    altFormat: "j F, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{dateState}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Date Range Picker</h3>
              </div>
              <div className="card-body">
                <DateRangePicker
                  value={dateRangeState}
                  label="Select Date Range"
                  onChange={handleRangeDateChange}
                  options={{
                    // minDate: 'today',
                    altInput: true,
                    altFormat: "j F, Y",
                    dateFormat: "Y-m-d",
                  }}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(dateRangeState)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">SelectYear</h3>
              </div>
              <div className="card-body">
                <YearSelect
                  label="Select Year"
                  value={yearValue}
                  startYear={2015}
                  endYear={2025}
                  onChange={handleSelectYearChange}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{yearValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">SelectMonth</h3>
              </div>
              <div className="card-body">
                <MonthSelect
                  label="Select Months"
                  onChange={handleSelectMonthChange}
                  value={monthValue}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{monthValue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Select Pagination</h3>
              </div>
              <div className="card-body">
                <SelectPaginate
                  label="Select Products"
                  debounceTimeout={500}
                  onChange={handlePaginateChange}
                  initialValue={paginateSelectValue}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(paginateSelectValue)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Select Reference</h3>
              </div>
              <div className="card-body">
                <SelectReference
                  label="Select Province"
                  collection="province"
                  keyLabel="name"
                  keyValue="id"
                  onChange={handleProvince}
                  initialValue={province}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(province)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Select Reference</h3>
              </div>
              <div className="card-body">
                <SelectReference
                  label="Select City"
                  collection="city"
                  keyLabel="name"
                  keyValue="id"
                  params={{
                    status: 1,
                    id_provinsi: province,
                  }}
                  deps={province}
                  onChange={handleCity}
                  initialValue={city}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{JSON.stringify(city)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Month Select</h3>
              </div>
              <div className="card-body">
                <MonthYearPicker
                  label="Select Month & Year"
                  value={monthYearValue}
                  onChange={handleMonthYearChange}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{monthYearValue}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">Checkbox</h3>
              </div>
              <div className="card-body">
                <Checkbox
                  label="Click Me"
                  value={boxValue}
                  onChange={handleCheckbox}
                />
                <div>
                  <h6>Output:</h6>
                  <p>{boxValue.toString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Button variant="info" onClick={handleShowModal}>
            Show Modal
          </Button>
        </div>
      </Content>
    </>
  );
};

export { ProductList };
