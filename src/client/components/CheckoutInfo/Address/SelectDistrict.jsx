import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

const apiEndpoint = "https://provinces.open-api.vn/api/"


const SelectDistrict = ({  provinceId, setDistrict }) => {
  const [districts, setDistricts] = useState([]);

  const fetchDistricts = async () => {
    const rdata = await axios
      .get(`${apiEndpoint}p/${provinceId}`, {
        params: { depth: 2 },
      });
    const districts = [];
    rdata?.data &&
      rdata.data.districts.forEach((district) => {
        districts.push({
          value: district.name,
          label: district.name,
          id: district.code,
        });
      });
    setDistricts(districts);
  };

  const handleChange = (e) =>{
    const district = JSON.parse(e.target.value);
    setDistrict(district);
  }

  useEffect(() => {
    provinceId && fetchDistricts();
  }, [provinceId]);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>District</Form.Label>
        <Form.Select onChange={handleChange}>
          {districts.map((district) =>
            <option key={district.id} value={JSON.stringify(district)}>
              {district.label}
            </option> 
          )}  
      
      </Form.Select>
      </Form.Group>
    </>
  );
};

export default SelectDistrict;
