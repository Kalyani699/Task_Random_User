import "./styles.css";
import Axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [data, setData] = useState({});
  const fetchData = async () => {
    let res = await Axios.get("https://randomuser.me/api");
    //Desturcturing of elements from response

    localStorage.setItem(
      "randomUser",
      JSON.stringify(res && res.data.results[0])
    );
    let items = JSON.parse(localStorage.getItem("randomUser"));
    let { first, last } = items && items.name;
    let { email } = items && items;
    setData({ first, last, email });
  };
  useEffect(() => {
    fetchData();
  }, []);
  // useEffect(()=>{
  //   localStorage.getItem('randomUser');
  // },[data])
  return (
    <div className="App">
      {/* to refresh the random user */}
      <button onClick={() => fetchData()}>Refresh</button>
      {
        // to display the fetched user
        data && (
          <>
            <p>
              Full Name : {data.first} {data.last}{" "}
            </p>
            <p>Email : {data.email} </p>
          </>
        )
      }
    </div>
  );
}
