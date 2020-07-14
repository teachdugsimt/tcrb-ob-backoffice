import React, { useEffect, useState } from "react";
import { Table, Select, Button, Row, Col } from "antd";
import { TcrbButton, TcrbPopconfirm, TcrbTabs } from '../../antd-styles/styles'
import { inject, observer } from "mobx-react";
import { withTranslation } from "../../../i18n";
import _ from "lodash";

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
      console.log("All Data change here : ", cellArrayChange);
    }, [cellArrayChange]);

    useEffect(() => {
      userAccessManagementStore.getDataMatrix();
    }, []);

    // useEffect(() => {
    //   return () => {
    //     if(matrixAll && matrixAll.length > 0 && JSON.parse(JSON.stringify(userAccessManagementStore.dataMatrix)))
    //       userAccessManagementStore.clearMatrixData();
    //   }
    // }, [])

    useEffect(() => {
      if (matrixAll && matrixAll.length > 0) {
        addFunctionToDataSource(matrixAll);
        addRoleToColumn();
      }
      else {
        let data = [
            {
              id: 1,
              name: "role1",
              functions: [
                { id: 1, is_allowed: false, is_masked: false, name: "function1" },
                { id: 2, is_allowed: false, is_masked: false, name: "function2"},
              ],
            },
            {
              id: 2,
              name: "role2",
              functions: [{ id: 8, is_allowed: false, is_masked: false,name: "function3" },
              { id: 9, is_allowed: false, is_masked: false,name: "function4" }],
            },
          ]
          setmatrixAll(data)
          addFunctionToDataSource(matrixAll);
        addRoleToColumn();
      }
    }, [matrixAll])

    useEffect(() => {
      if (userAccessManagementStore.dataMatrix) {
        let tmp_matrix = JSON.parse(
          JSON.stringify(userAccessManagementStore.dataMatrix)
        );
        tmp_matrix = tmp_matrix.filter((e) => e.functions.length > 0);
        console.log("TMP LIST MATRIX", tmp_matrix);
        setmatrixAll(tmp_matrix);
        // addFunctionToDataSource(tmp_matrix);
        // addRoleToColumn();
      }
    }, [userAccessManagementStore.dataMatrix]);

    const _getAllFunction = (arr) => {
      let tmp = [];
      if (arr && arr.length > 0) {
        arr.map((e, i) => {
          if (e.functions && e.functions.length > 0) {
            tmp.push(...e.functions);
          }
        });
        return tmp;
      } else return [];
    };

    const addFunctionToDataSource = (arr) => {
      console.log("Arr first when Reload :: ", arr);
      if (arr && arr.length > 0) {
        let function_all = _getAllFunction(arr);
        // console.log("FUNCTIONS ALL : ", function_all);
        let result_source = [];
        function_all.map((func, indFunc) => {
          let each_row = {};
          arr.map((role, indRole) => {
            each_row[role.name] = {
              role_id: role.id,
              role_name: role.name,
              function_id: func.id,
              function_name: func.name,
              is_allowed: _getFieldByRoleAndFunction(
                role.id,
                func.id,
                "is_allowed"
              ),
              is_masked: _getFieldByRoleAndFunction(
                role.id,
                func.id,
                "is_masked"
              ),
            };
          });
          each_row.key = "row" + indFunc;
          each_row.function_name = func.name;
          result_source.push(each_row);
        });
        // let all_role_name = _getAllRoleName(matrixAll)
        let non_duplicate_data = _.uniqBy(result_source, "function_name");
        console.log("DataSource -> non_duplicate_data :: ", non_duplicate_data);
        setMockDataSourceDynamic(non_duplicate_data);
      } else {
        return [];
      }
      // console.log(dataSource);
      // setMockDataSourceDynamic(dataSource);
    };

    const _handleChangeCell = (e, record) => {
      console.log("Recrd is change (old value) : ", record);
      let list_cell_update = cellArrayChange;
      let newCellData = record;

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
        let tmp_row = list_cell_update.find(
          (item) =>
            item.role_id == record.role_id &&
            item.function_id == record.function_id
        );

        if (!tmp_row) {
          // ถ้าเป็นค่า cell ใหม่ที่ยังไม่เคยอัพเดท
          list_cell_update.push(newCellData);
          console.log("Final arr result :: ", list_cell_update);
          setcellArrayChange(list_cell_update);
        } else {
          // ถ้าอัพเดท cell ช่องเดิมรอบที่ 2 ขึ้นไป ต้องแทนที่ช่องเก่าน่ะ
          list_cell_update.map((ele, ind) => {
            if (
              ele.role_id == record.role_id &&
              ele.function_id == record.function_id
            ) {
              list_cell_update.splice(ind, 1, newCellData);
            }
          });
          console.log("Arr change more 2 rounds : ", list_cell_update);
          console.log("Final arr result :: ", list_cell_update);
          setcellArrayChange(list_cell_update);
        }
      } else {
        list_cell_update.push(newCellData);
        console.log("Final arr result :: ", list_cell_update);
        setcellArrayChange(list_cell_update);
        // normal push to array
      }
    };

    const _getFieldByRoleAndFunction = (role_id, function_id, typedata) => {
      let result_search_is_allowed;
      matrixAll.map((role, indRole) => {
        if (role.functions && role.functions.length > 0) {
          role.functions.map((func, indFunc) => {
            if (role.id == role_id && func.id == function_id) {
              // console.log("E found : ", func[typedata])
              result_search_is_allowed =
                func[typedata] === true
                  ? true
                  : func[typedata] === false
                    ? false
                    : null;
              // console.log("Found !! :: ", result_search_is_allowed)
            } else {
              // result_search_is_allowed = null;
            }
          });
        }
      });
      // console.log(role_id, " - ", function_id , " - ", typedata," - ",result_search_is_allowed);
      return result_search_is_allowed;
    };

    const _getFieldFromDataSource = (role_name_tmp, index_round) => {
      let result_name_index;
      mockDataSourceDynamic.map((e, i) => {
        if (i == index_round) {
          let obj_test = Object.keys(e);
          result_name_index = obj_test.find((e) => e == role_name_tmp);
        }
      });
      // console.log("Result name index :: ", result_name_index);
      return result_name_index;
    };

    const _getSlotValueData = (this_cell) => {
      let slot_data;
      let check_have_ever_update_cell = cellArrayChange.find(
        (e) =>
          e.function_id == this_cell.function_id &&
          e.role_id == this_cell.role_id
      );
      if (
        check_have_ever_update_cell &&
        check_have_ever_update_cell != undefined
      ) {
        if (check_have_ever_update_cell.is_allowed === true) {
          slot_data =
            check_have_ever_update_cell.is_masked === true ? "M" : "U";
        } else {
          slot_data = "-";
        }
      } else {
        if (this_cell.is_allowed === true) {
          slot_data = this_cell.is_masked === true ? "M" : "U";
        } else if (
          this_cell.is_masked === undefined &&
          this_cell.is_allowed === undefined
        ) {
          slot_data = "-";
        } else if (this_cell.is_allowed === false) {
          slot_data = "-";
        }
      }
      return slot_data;
    };

    const addRoleToColumn = () => {
      let tmp_column = [];
      for (let index = 0; index <= matrixAll.length; index++) {
        if (index == 0) {
          tmp_column.push({
            title: "Functions",
            dataIndex: "function_name",
          });
        }
        if (matrixAll[index]) {
          tmp_column.push({
            title: matrixAll[index].name,
            dataIndex: _getFieldFromDataSource(matrixAll[index].name, index),
            render: (text, record) => {
              let this_cell = record[matrixAll[index].name];
              let slot_data = _getSlotValueData(this_cell);
              return (
                <Select
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={slot_data}
                  showArrow={false}
                  onChange={(e) => {
                    console.log(
                      "Record send to handle change : ",
                      e,
                      this_cell
                    );
                    _handleChangeCell(e, this_cell);
                  }}
                >
                  <Option value="unmark"> U</Option>
                  <Option value="mark">M</Option>
                  <Option value="notUse">-</Option>
                </Select>
              );
            },
          });
        }
      }
      console.log("Test Column : ", tmp_column);
      setColumn(tmp_column);
    };

    const findObjByRoleId = (role_id) => {
      let tmp = cellArrayChange;
      let arr_result = [];
      tmp.map((e, i) => {
        if (e.role_id == role_id) {
          arr_result.push({
            id: e.function_id,
            is_allowed: e.is_allowed,
            is_masked: e.is_masked,
            name: e.function_name,
          });
        }
      });
      return arr_result;
    };

    const clickSubmit = () => {
      let data = cellArrayChange;
      let tmp_to_update = [];
      data.map((e, i) => {
        if (!tmp_to_update.find((item) => item.id == e.role_id)) {
          tmp_to_update.push({
            id: e.role_id,
            name: e.role_name,
            functions: findObjByRoleId(e.role_id),
          });
        }
      });

      if (tmp_to_update.length > 0) {
        let final_data = {
          change_type: "MAP_ROLES_FUNCTIONS",
          action: "Update",
          currentData: {
            data: JSON.parse(
              JSON.stringify(userAccessManagementStore.dataMatrix)
            ),
            maker_id: 100,
          },
          newData: {
            data: tmp_to_update,
            maker_id: 100,
          },
          maker_id: 100,
        };
        console.log("FINAL DATA : ", final_data);
        userAccessManagementStore.updateMatrixRequest(final_data);
      } else {
        alert("no something change");
      }
      // console.log("data all :: ", data)
      // console.log("Final for submit :; ", tmp_to_update)
    };

    return (
      <Col>
        <Table
          columns={column && column.length > 1 ? column : []}
          dataSource={mockDataSourceDynamic && mockDataSourceDynamic.length > 1 ? mockDataSourceDynamic : []}
          size="small"
        />
        <Row>
          <Col span={10} style={{ marginTop: -38 }}>
            <TcrbButton className='primary' onClick={() => clickSubmit()}>Submit</TcrbButton>
          </Col>
        </Row>
      </Col>
    );
  })
);

RoleBasedMatrix.getInitialProps = async () => ({
  namespacesRequired: [],
})

export default withTranslation()(RoleBasedMatrix);














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
