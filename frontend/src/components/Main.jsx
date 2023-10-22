import React, { useEffect, useState } from 'react';
import CustomWordCloud from "./CustomWordCloud";
import Card from "./Card";
import Topbar from "./Topbar";
import { baseUrl } from "../config";

export default function Main({ tab }) {


  return (
    <div className="main-content">
      {/* <Topbar /> */}
      {/* <Card title="Wordcloud" subtitle="">
          
      </Card> */}
      <CustomWordCloud tab={tab} />
    </div>
  );
}
