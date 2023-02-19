import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const apiEndpoint = "https://provinces.open-api.vn/api/"


const SelectWard = ({  districtId }) => {
  const [wards, setWards] = useState([]);

  const fetchWards = async () => {
    const rdata = await axios
      .get(`${apiEndpoint}d/${districtId}`, {
        params: { depth: 2 },
      });
    const wards = [];
    rdata?.data &&
      rdata.data.wards.forEach((ward) => {
        wards.push({
          value: ward.name,
          label: ward.name,
          id: ward.code,
        });
      });
      setWards(wards);
  };

  useEffect(() => {
    districtId && fetchWards();
  }, [districtId]);

  return (
    <>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Ward</Form.Label>
        <Form.Select>
          {wards.map((ward) =>
            <option key={ward.id} value={ward.value}>
              {ward.label}
            </option> 
          )}  
      
      </Form.Select>
      </Form.Group>
    </>
  );
};

export default SelectWard;
