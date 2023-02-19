import React, { useEffect, useState } from "react";
import { useField, ErrorMessage } from "formik";
import { Form } from "react-bootstrap";
import axios from "axios";

const apiEndpoint = "https://provinces.open-api.vn/api/"

const SelectProvince = ({setProvince}) => {
  const [provinces, setProvinces] = useState([]);

  const fetchProvinces = async () => {
    const rdata = await axios.get(apiEndpoint);
    const provinces = [];
    rdata?.data &&
      rdata.data.forEach((province) => {
        provinces.push({
          value: province.name,
          id: province.code,
        });
      });
    setProvinces(provinces);
  };

  const handleSelectChange = (e) =>{
    const province = JSON.parse(e.target.value);
    setProvince(province)
  }

  useEffect(() => {
    fetchProvinces();
  }, []);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Provinces</Form.Label>
        <Form.Select onChange={handleSelectChange}>
          {provinces.map((province) =>
            <option key={province.id} value={JSON.stringify(province)}  >
              {province.value}
            </option> 
          )}  
      
      </Form.Select>
      </Form.Group>
    </>
  );
};

export default SelectProvince;
