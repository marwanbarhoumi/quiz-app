import React, { useEffect, useState } from "react";
import { getServerData } from "../helper/helper";

export default function ResultTable() {

    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch data from the server using getServerData function
            const result = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`);
    
            // Set the fetched data to the state
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function when the component mounts
        fetchData();
      }, []);

  return (
    <div>
      <table>
        <thead className="table-header">
          <tr className="table-row">
            <td>Name</td>
            <td>Attemps</td>
            <td>Earn Points</td>
            <td>Result</td>
          </tr>
        </thead>
        <tbody>
        {data && data.length > 0 ? (
          data.map((v, i) => (
            <tr className='table-body' key={i}>
              <td>{v?.username || ''}</td>
              <td>{v?.attempts || 0}</td>
              <td>{v?.points || 0}</td>
              <td>{v?.achived || ""}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No Data Found</td>
          </tr>
        )}
      </tbody>
      </table>
    </div>
  );
}
