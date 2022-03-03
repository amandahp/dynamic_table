import React, {useState, Fragment} from "react";
import "./Table.css"


const tdStyle = {
  border: "8px solid black"
};

export const Table = ({id = "id", data, pageLimit}) => {
  let column = [];
  let dataValue = [];
  let columns = [];
  let nameColumn = {};
  let itemTable = [];
  let found;

  data.forEach(function (item) {
    dataValue = Object.entries(item);
    const rowTable = new Array(item)
    itemTable.push(rowTable)
  });

  const dataLimit = itemTable.length/pageLimit
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [inputValue, setInputValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [visibilityTable, setVisibility] = useState(false)
  const [newData, setNewData] = useState([])

  dataValue.forEach(function (key) {
    column.push(key[0]);
  });
  column.forEach(function (keyValue) {
    nameColumn = { path: keyValue, name: `${keyValue.charAt(0).toUpperCase() + keyValue.slice(1)}` };
    columns.push(nameColumn);
  });

  const handleSearch = (inputText) => {
    if (inputText?.length > 0){
      data.forEach(function(value) {
        const valuesKeys = []
        Object.keys(value).forEach(key => {
          let valueKey = value[key];
          valuesKeys.push(valueKey)
        })
        found = data.find((post,) => {
          let valor = ""
          column.forEach(function(n){
            valor = (post[`${n}`])
          })
          for (var i = 0; i < Object.keys(data).length; i++) {
            if(valor === inputText){
              setVisibility(true)
              return true;
            }
            setVisibility(false)
            break
          }
        })
      })
    }else{
      return;
    }
    setInputValue(inputText)
    setNewData([found])
	}

  console.log(newData)

  const goToNextPage = () => {
    setCurrentPage((pages) => pages + 1)
  }

  const goToPreviousPage = () => {
    setCurrentPage((pages) => pages - 1)
  }

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent)
    setCurrentPage(pageNumber)
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return itemTable.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1)/pageLimit)*pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  }

  return (
    <>
      <table>
        <thead>
          <div className="filter">
            <div style={{ margin: '0 auto', marginTop: '10%' }}>
              <label>Search:</label>
              <input onChange={(event) => handleSearch(event.target.value)} />
            </div>
          </div>
            <tr>
              {columns.map(({ path, name }) => (
                <th style={tdStyle} key={path}>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(visibilityTable 
              ? 
              <Fragment> 
                {newData.map((rowData) => (
                  <tr key={rowData[id]}>
                    {columns.map(({ path }) => (
                        <td style={tdStyle} key={path}>
                          {rowData[path]}
                        </td>
                        ))}
                  </tr>
                ))}
              </Fragment>
              :
              <Fragment> 
                {getPaginatedData().map((d, idx) => (
                  <Fragment key={idx}>
                    {d.map((rowData) => (
                      <tr key={rowData[id]}>
                        {columns.map(({ path }) => (
                          <td style={tdStyle} key={path}>
                            {rowData[path]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            )}
        </tbody>
        <tfoot>
          <button
            onClick={goToPreviousPage}
            className={`prev ${currentPage === 1 ? 'disabled' : ''}`}
          >
            &#8592;
          </button>
          {getPaginationGroup().map((item, index) => (
            <button
              key={index}
              onClick={changePage}
              className={`paginationItem ${currentPage === item ? 'active' : null}`}
            >
              <span>{item}</span>
            </button>
            ))}
          <button
            onClick={goToNextPage}
            className={`next ${currentPage === pages ? 'disabled' : ''}`}
          >
            &#8594;
          </button>
        </tfoot>
      </table>
    </>
  );
};


