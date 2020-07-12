import React, { useEffect, useState } from "react";
import { Table, Select, Button } from "antd";
import { inject, observer } from "mobx-react";

const { Option } = Select;
const RoleBasedMatrix = inject("userAccessManagementStore")(
  observer((props) => {
    const [mockDataSourceDynamic, setMockDataSourceDynamic] = useState([]);
    const [column, setColumn] = useState(null);
    const [matrixAll, setmatrixAll] = useState([]);
    const [dataSource, setdataSource] = useState([]);
    const [testColumn, settestColumn] = useState([]);
    const { userAccessManagementStore } = props;
    const [cellArrayChange, setcellArrayChange] = useState([]);
    const roleList = 10;
    const functionList = 4;

    // let dataSource = [];
    // let testColumn = [];

    useEffect(() => {
      console.log("All Data change here : ", cellArrayChange)
    }, [cellArrayChange])

    useEffect(() => {
      // addRoleToColumn();
      // addFunctionToDataSource();
      userAccessManagementStore.getDataMatrix();
    }, []);

    useEffect(() => {
      if (userAccessManagementStore.dataMatrix) {
        let tmp_matrix = JSON.parse(
          JSON.stringify(userAccessManagementStore.dataMatrix)
        );
        tmp_matrix = tmp_matrix.filter((e) => e.functions.length > 0);
        console.log("TMP LIST MATRIX", tmp_matrix);
        setmatrixAll(tmp_matrix);
        addFunctionToDataSource(tmp_matrix);
        // addRoleToColumn();
      }
    }, [userAccessManagementStore.dataMatrix]);

    const addFunctionToDataSource = (arr) => {
      if (arr && arr.length > 0) {
        arr.map((e, i) => {
          e.functions.map((itemFunction, indexFunction) => {
            dataSource.push({
              function_id: itemFunction.id,
              function_name: itemFunction.name,
              role_id: e.id,
              role_name: e.name,
              is_allowed: itemFunction.is_allowed,
              is_masked: itemFunction.is_masked,
              function: "function_" + itemFunction.id,
              // key: indexFunction + 1,
              // ...roleMatrix,
            });
          });
        });
        console.log("Datasource :: ", dataSource);
        setMockDataSourceDynamic(dataSource);
      }
      // console.log(dataSource);
      // setMockDataSourceDynamic(dataSource);
    };

    useEffect(() => {
      if (matrixAll && matrixAll.length > 0 && testColumn.length == 0)
        addRoleToColumn();
    }, [matrixAll]);

    const _handleChangeCell = (e, record) => {
      console.log("Recrd is change (old value) : ", record);
      let list_cell_update = cellArrayChange;
      let newCellData = record;
      //       function: "function_18"
      //        function_id: 18
      //        function_name: "function CC"
      //        is_allowed: true
      //        is_masked: true
      //        key: 3
      //        role_id: 1
      //        role_name: "Role eiei 234"
      //        __proto__: Object

      // ยังไม่
      //unmark , mark, notUse
      if (e == "mark") {
        newCellData.is_allowed = true;
        newCellData.is_masked = true;
      } else if (e == "unmark") {
        newCellData.is_allowed = true;
        newCellData.is_masked = false;
      } else if (e == "notUse") {
        newCellData.is_allowed = false;
        newCellData.is_masked = false;
      }

      // กรณี แก้ cell เดิมมากกว่า 1 ครั้ง จะมีค่าในอาเรย์มากกว่า 1 ตัว
      // must be loop for check it

      if (list_cell_update && list_cell_update.length > 0) {
        let tmp_row = list_cell_update.find(item => item.role_id == record.role_id && item.function_id == record.function_id )

        if(!tmp_row){ // ถ้าเป็นค่า cell ใหม่ที่ยังไม่เคยอัพเดท
          list_cell_update.push(newCellData)
          console.log("Final arr result :: ",list_cell_update)
          setcellArrayChange(list_cell_update);
        } else {
          // ถ้าอัพเดท cell ช่องเดิมรอบที่ 2 ขึ้นไป ต้องแทนที่ช่องเก่าน่ะ
          list_cell_update.map((ele, ind) => {
            if(ele.role_id == record.role_id && ele.function_id == record.function_id){
              list_cell_update.splice(ind, 1, newCellData)
            }
          })
          console.log("Arr change more 2 rounds : ", list_cell_update);
          console.log("Final arr result :: ",list_cell_update)
          setcellArrayChange(list_cell_update);
        }
      } else {
        list_cell_update.push(newCellData);
        console.log("Final arr result :: ",list_cell_update)
        setcellArrayChange(list_cell_update);
        // normal push to array
      }
    };

    const addRoleToColumn = () => {
      for (let index = 0; index <= matrixAll.length; index++) {
        if (index == 0) {
          testColumn.push({
            title: "Functions",
            dataIndex: "function_name",
          });
        }

        if (matrixAll[index]) {
          testColumn.push({
            title: matrixAll[index].name,
            dataIndex: matrixAll[index],
            render: (text, record) => {
              // console.log("Column renderer text 11 : ", text);
              // console.log("addRoleToColumn 22-> record", record);
              let slot_data;
              let check_have_ever_update_cell = cellArrayChange.find(
                (e) =>
                  e.function_id == record.function_id &&
                  e.role_id == record.role_id
              );
              if (check_have_ever_update_cell) {
                if (check_have_ever_update_cell.is_allowed == true) {
                  slot_data =
                    check_have_ever_update_cell.is_masked == true
                      ? "Mark"
                      : "Unmark";
                } else {
                  slot_data = "Not Use";
                }
              } else {
                if (record.is_allowed == true) {
                  slot_data = record.is_masked == true ? "Mark" : "Unmark";
                } else {
                  slot_data = "Not Use";
                }
              }
              // console.log("Record when change in function: ", record)

              return (
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={slot_data}
                  showArrow={false}
                  // value={slot_data}
                  onChange={(e) => {
                    console.log("Record send to handle change : ",e, record);
                    _handleChangeCell(e, record);
                  }}
                >
                  <Option value="unmark"> Unmark</Option>
                  <Option value="mark">Mark</Option>
                  <Option value="notUse">Not Use</Option>
                </Select>
              );
            },
          });
        }

        // else {
        //   // Role จริงๆ ในDB มีไม่ถึง 10 Role ให้ มันเรนเดอร์ม้อค
        //   testColumn.push({
        //     title: "Role" + "_" + index,
        //     dataIndex: "role_" + index,
        //     render: (text, record) => {
        //       return (
        //         <Select
        //           key={index + 1}
        //           style={{ width: "100%" }}
        //           placeholder="Please select"
        //           defaultValue="notUse"
        //           showArrow={false}
        //         >
        //           <Option value="unmark"> Unmark</Option>
        //           <Option value="mark">mark</Option>
        //           <Option value="notUse">Not Use</Option>
        //         </Select>
        //       );
        //     },
        //   });
        // }
      }
      console.log("Test Column : ", testColumn);
      setColumn(testColumn);
    };

    const findObjByRoleId = (role_id) => {
      let tmp = cellArrayChange
      let arr_result = []
      tmp.map((e, i) => {
        if(e.role_id == role_id){
          arr_result.push({ id: e.function_id,
             is_allowed: e.is_allowed,
              is_masked: e.is_masked,
              name: e.function_name })
        }
      })
      return arr_result
    }

    const clickSubmit =() => {
      let data = cellArrayChange
      let tmp_to_update = []
      data.map((e, i) => {

        if(!tmp_to_update.find(item => item.id == e.role_id)){
        tmp_to_update.push({
          id: e.role_id,
          name: e.role_name,
          functions: findObjByRoleId(e.role_id),
        })
      }
      })

      if(tmp_to_update.length > 0){
        let final_data = {
          change_type: "MAP_ROLES_FUNCTIONS",
          action: "Update",
          currentData: {
            data: JSON.parse(JSON.stringify(userAccessManagementStore.dataMatrix))
          },
          newData: {
            data: tmp_to_update
          },
          maker_id: "mochiato"
        }
        console.log("FINAL DATA : ", final_data)
        userAccessManagementStore.updateMatrixRequest(final_data)
      } else {
        alert("no something change")
      }
      // console.log("data all :: ", data)
      // console.log("Final for submit :; ", tmp_to_update)
    }

    return (
      <div>
        <Table
          columns={column && column.length > 1 ? column : []}
          dataSource={mockDataSourceDynamic}
        />
        <Button onClick={() => clickSubmit()}>Submit</Button>
      </div>
    );
  })
);

export default RoleBasedMatrix;

// let data = [
//         {
//           id: 1,
//           name: "role1",
//           functions: [
//             { id: 2, is_allowed: false, is_masked: false },
//             { id: 3, is_allowed: false, is_masked: false },
//           ],
//         },
//         {
//           id: 2,
//           name: "role2",
//           functions: [
//              { id: 8, is_allowed: false, is_masked: false },
//              { id: 10, is_allowed: false, is_masked: false }
//            ],
//         },
//       ],

// let tmp_row = { function_id: 2, role_id: 1, role_name: "role1", is_allowed: false, is_masked: false }
