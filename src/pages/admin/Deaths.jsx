import React, { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Tab from "../../components/Tab.component";
import DeathTable from "../../components/DeathTable";
import AddDeath from "../../components/AddDeath";

function Deaths() {
  return (
    <DefaultLayout>
      <DeathTable />
    </DefaultLayout>
  );
}

export default Deaths;
