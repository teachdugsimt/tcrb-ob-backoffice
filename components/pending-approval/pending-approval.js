import React, { useState, useEffect, useMemo } from "react";
import ReactDOMServer from "react-dom/server";
import { Table, Popconfirm, Row, Col } from "antd";
import { inject, observer } from "mobx-react";
import { DownOutlined } from "@ant-design/icons";
import { withTranslation } from "../../i18n";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TcrbSpin, TcrbPopconfirm } from "../antd-styles/styles";
import SimpleModal from "../simple-modal";
import styled from "styled-components";
import moment from "moment";
import { addKeyToDataSource } from "../data-utility";
const HoverIcon = styled(Col)`
  color: green;
  cursor: pointer !important;
`;
const HoverIconReject = styled(Col)`
  color: red;
  cursor: pointer !important;
`;
const PendingApprovals = inject("pendingApprovalStore")(
  observer((props) => {
    const expand = {
      expandedRowRender: (record) => <p>{record.description}</p>,
    };
    const [expandable, setExpandable] = useState(expand);
    const [hasData, setHasData] = useState(true);
    const [top, setTop] = useState("none");
    const [bottom, setBottom] = useState("bottomRight");
    const [pendingApprovalData, setPendingApprovalData] = useState([]);
    const [title, settitle] = useState("Action details");
    const [textOk, settextOk] = useState("Ok");
    const [textCancel, settextCancel] = useState("Cancel");
    const [modalString, setmodalString] = useState("initialState");
    const [visible, setvisible] = useState(false);
    const { pendingApprovalStore, t } = props;

    const renderTableData = (data) => {
      console.log("DATA: ", data);
      const keys = Object.keys(data);
      return ReactDOMServer.renderToStaticMarkup(
        <table style={{ border: 1 }}>
          {keys.map((k, id) => {
            console.log("KEY: ", k);
            return (
              <tr key={id}>
                <td
                  style={{
                    border: "1px solid lightgrey",
                    width: 200,
                    paddingLeft: 10,
                    backgroundColor: "#eeeeee",
                  }}
                >
                  {k}
                </td>
                <td
                  style={{
                    border: "1px solid lightgrey",
                    width: 200,
                    paddingLeft: 10,
                  }}
                >
                  {Array.isArray(data[k]) ? (
                    data[k].map((e, index) => {
                      const arrKeys = Object.keys(e);
                      return (
                        <div
                          style={{
                            margin: 5,
                            padding: 3,
                            borderRadius: 3,
                            backgroundColor: "lightgray",
                          }}
                          key={index}
                        >
                          {arrKeys &&
                            arrKeys.map((key, idx) => {
                              if (e[key] && typeof e[key] != "object") {
                                const name = e[key] ? e[key] : "-";
                                return (
                                  <span
                                    key={index + "_" + idx}
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    {key + ": " + name}
                                  </span>
                                );
                              }
                            })}
                        </div>
                      );
                    })
                  ) : // : (data[k]) //
                  typeof data[k] === "object" && data[k] ? (
                    <div
                      style={{
                        margin: 5,
                        padding: 3,
                        borderRadius: 3,
                        backgroundColor: "lightgray",
                      }}
                    >
                      {Object.keys(data[k]) &&
                        Object.keys(data[k]).map((key, idx) => {
                          const name = data[k][key] ? data[k][key] : "-";
                          return (
                            <span
                              key={idx}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              {key + ": " + name}
                            </span>
                          );
                        })}
                    </div>
                  ) : data[k] ? (
                    data[k]
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            );
          })}
        </table>
      );
    };

    const columns = [
      {
        title: "Ticket#",
        dataIndex: "id",
      },
      {
        title: "Request Type",
        dataIndex: "change_type",
      },
      {
        title: "Request Description",
        key: "description",
        render: (record) => {
          // console.table(record)
          let data = JSON.parse(JSON.stringify(record));
          let string = JSON.parse(data.data);

          return (
            <Row>
              <span>
                {data.description ? `${data.description} ` : `${data.action}`}
              </span>
              <div
                onClick={() => {
                  setmodalString(`
                  <b>Action</b> : ${
                    data.action
                  }${" "}<br /><b>Request Type</b> : ${data.change_type}
                  <div style="display: flex; flex-direction: row;">
                  <div style="flex:1;margin-right: 5px;"><b>Current Value</b> : ${renderTableData(
                    string.Current
                  )}</div>
                  <div style="flex:1;margin-left: 5px;"><b>New Value</b>: ${renderTableData(
                    string.New
                  )}</div>
                  </div>
                `);
                  setvisible(true);
                }}
              >
                <span>
                  <a> : details</a>
                </span>
              </div>
            </Row>
          );
        },
      },
      {
        title: "Request ID",
        dataIndex: "maker_id",
      },
      {
        title: "Request Date",
        // dataIndex: 'requested_date',
        key: "requested_date",
        render: (record) => {
          let data = JSON.parse(JSON.stringify(record));
          let date = moment(data.requested_date).format("LLL");
          return <span>{date}</span>;
        },
      },
      {
        title: "Action",
        key: "action",
        render: (record) => (
          <Row gutter={16}>
            <TcrbPopconfirm
              title={"Confirm to Approve !!!"}
              onConfirm={() => processPending("APPROVE", record)}
            >
              <HoverIcon className="gutter-row" span={6}>
                <CheckCircleOutlined height={"1.5em"} width={"1.5em"} />
              </HoverIcon>
            </TcrbPopconfirm>
            <TcrbPopconfirm
              title={"Confirm to Reject !!!"}
              onConfirm={() => processPending("REJECT", record)}
            >
              <HoverIconReject className="gutter-row" span={6}>
                <CloseCircleOutlined height={"1.5em"} width={"1.5em"} />
              </HoverIconReject>
            </TcrbPopconfirm>
          </Row>
        ),
      },
    ];

    useEffect(() => {
      // call api
      const data = {
        filter: {
          order: [["id"]],
        },
      };
      pendingApprovalStore.getPendingApprove(data);
    }, []);

    useEffect(() => {
      if (
        pendingApprovalStore.responseGetPendingApproveList &&
        pendingApprovalStore.responseGetPendingApproveList.length > 0
      ) {
        addKeyToDataSource(
          pendingApprovalStore.responseGetPendingApproveList
        ).then((result) => {
          //businessParametersSetupStore.arrayProductLimit = result
          setPendingApprovalData(result);
        });
      }
    }, [pendingApprovalStore.responseGetPendingApproveList]);

    const processPending = (status, record) => {
      console.log("RECORD PROCESS PENDING :: ", JSON.parse(JSON.stringify(record)))
      // processDeRegister
      let data = {
        allowAction: status,
        data: record,
        id: record.id,
      };
      pendingApprovalStore.setTmpPendingListID(record.id);
      pendingApprovalStore.processPendingListApprove(data);
    };

    useEffect(() => {
      if (
        pendingApprovalStore.tmpPendingListID &&
        pendingApprovalStore.tmpPendingListID != null
      ) {
        if (pendingApprovalData && pendingApprovalData.length > 0) {
          const list_all = JSON.parse(JSON.stringify(pendingApprovalData));
          const old_data = pendingApprovalStore.tmpPendingListID;
          list_all.map((e, i) => {
            if (old_data == e.id) {
              list_all.splice(i, 1);
            }
          });
          setPendingApprovalData(list_all);
        }
      }
    }, [pendingApprovalStore.tmpPendingListID]);

    const _onConfirm = () => {
      setvisible(false);
    };
    const _onCancel = () => {
      setvisible(false);
    };

    const tableColumns = columns.map((item) => ({ ...item }));

    return (
      <TcrbSpin
        spinning={pendingApprovalStore.apiLoading}
        size="large"
        tip="Loading..."
      >
        <Row>
          <Col span={24}>
            <Table
              pagination={{ position: [top, bottom] }}
              columns={tableColumns}
              dataSource={pendingApprovalData}
              // scroll={scroll}
            />
            <SimpleModal
              title={title}
              // type={modalType}
              onOk={() => _onConfirm()}
              onCancel={() => _onCancel()}
              textCancel={textCancel}
              textOk={textOk}
              width={800}
              modalString={modalString}
              visible={visible}
            />
          </Col>
        </Row>
      </TcrbSpin>
    );
  })
);

export default withTranslation("common")(PendingApprovals);
