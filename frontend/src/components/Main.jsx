import React, { useEffect, useState } from 'react';
import CustomWordCloud from "./visualization/CustomWordCloud";
import Barchart from "./visualization/Barchart";
import Card from "./main/Card";
import Topbar from "./main/Topbar";
import { baseUrl } from "../config";

export default function Main({ tab }) {

  return (
    <div className="main-content">
      {/* <Topbar /> */}
      {/* <Card title="Wordcloud" subtitle="">
          
      </Card> */}
      <CustomWordCloud tab={tab} />
      <Card title="Advanced Analytics" subtitle="" />
      {/* <Barchart column="sex"/> */}
    </div>
  );
}
