import React from "react";
import { useState, useEffect } from "react";
import { host } from "../config";
import Axios from "axios";

const OurCompanies = () => {
  const [listOfPartners, setListOfPartners] = useState([]);

  useEffect(() => {
    Axios.get(host + "/getloyaltyprogram", {})
      .then((response) => {
        console.log(response);
        setListOfPartners(response.data);
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }, []);
  //return <div>This is the our companies page, coming up soon!</div>;
  return (
    <div>
      {listOfPartners.map((program) => {
        return (
          <>
            <h1>currencyName: {program.currencyName}</h1>
            <h1>descripton: {program.description}</h1>
            <h1>enrollmentLink: {program.enrollmentLink}</h1>
            <h1>processingTime: {program.processingTime}</h1>
            <h1>programID: {program.programID}</h1>
            <h1>programName: {program.programName}</h1>
            <h1>termsAndCondition: {program.termsAndCondition}</h1>
          </>
        );
      })}
    </div>
  );
};

export default OurCompanies;
