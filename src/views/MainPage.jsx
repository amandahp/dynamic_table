import React, { useCallback, useState, useEffect } from "react";
import { Table } from "../components"
import get from "../api/api"

export const MainPage = () => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async()=> {
    const response = await get()
    setData(response.data.data)
  },[])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="App">
      {data.length > 0 && (
        <Table 
          data={data}
          pageLimit={5}
        />
      )}
    </div>
  );
}