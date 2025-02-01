import FoodComponent from "./components/FoodComponent";
import { useEffect, useState } from "react";
import MenuData from "./data/MenuData";
import "./App.css";

function App() {
  const [foodData, setFoodData] = useState(MenuData);
  const [dataInPage, setDatatInPage] = useState([]);
  const [numPage, setNumPage] = useState(0);

  //*ข้อมุลทั้งหมด 10 จำนวน
  //*จำนวนข้อมูลแต่ละหน้า  นำจำนวนข้อมูลทั้งหมด / จำนวนข้อมูลแต่ละหน้า = จำนวนเลขหน้า
  //* dataInPage จะแสดงต่อเมื่อเรียกใช้งาน pagination

  const pagination = () => {
    const foodPerPage = 3; //* ให้แสดงรายการอาหาร 3 รายการต่อ 1 หน้า

    //*ดึงเอาสมาชิกใน allFood มาใช้
    const pages = Math.ceil(MenuData.length / foodPerPage);
    console.log("Page No. =", pages);

    //สร้างสมาชิก Array ก้อนของใครของมัน
    const newFood = Array.from({ length: pages }, (data, index) => {
      //กำหนดช่วงข้อมูล ดึงสมาชิกใน [0] * จำนวนรายการที่ต้องการแสดงใน 1 หน้า
      const start = index * foodPerPage;
      return MenuData.slice(start, start + foodPerPage);
    });
    return newFood;
  };

  //*สร้าง function สำหรับการาคลิ๊กปุ่มแต่ละเพจ
  const handlePage = (index) => {
    setNumPage(index);
   
  };

  // ต้องการเรียกใช้ pagenation ตอนไหน ก็เรียก useEffect มาใช้
  useEffect(() => {
    const paginate = pagination();
    setDatatInPage(paginate);
    setFoodData(paginate[numPage])
  }, [numPage]);

  return (
    <div className="App">
      <h1>FoodCard | Pagination</h1>
      <div className="container">
        {foodData.map((data, index) => {
          return <FoodComponent key={index} {...data} />;
        })}
      </div>
      <div className="pagination-container">
        {dataInPage.map((data, index) => {
          return (
            <button key={index} onClick={() => handlePage(index)} className={`page-btn ${index === numPage? "active-btn" : "null"}`}>
              {index + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default App;
