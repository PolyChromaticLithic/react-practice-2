import React from "react";
import Tabs from "src/modules/Tab";

function Works() {
  const tabs = [
    { id: "home", label: "Home", content: <p>Welcome to the Home tab!</p> },
    { id: "profile", label: "Profile", content: <p>Here is your Profile information.</p> },
    { id: "settings", label: "Settings", content: <p>Adjust your Settings here.</p> },
  ];

  return <>
    <h1>Works</h1>
    <Tabs tabs={tabs} />
  </>;
}

export default Works;