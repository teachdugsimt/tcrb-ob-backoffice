import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Upload,
  Input,
  Modal,
  Form,
  Menu,
  Dropdown,
  Table,
  Tag,
  Space,
  message,
  Select,
} from "antd";
import { useFormik, Formik } from "formik";
import { DownOutlined, UserOutlined, UploadOutlined } from "@ant-design/icons";
import { PageHeader } from "../page-header";
import { withTranslation, i18n } from "../../i18n";
import SimpleInput from "../simple-input";
import { inject, observer } from "mobx-react";
import { TcrbSpin } from "../antd-styles/styles";
const AddPartner = inject(
  "partnerOnboard",
  "loginStore"
)(
  observer((thisProps) => {
    const [subDistrict, setSubDistrict] = useState("");
    const [District, setDistrict] = useState("");
    const [Province, setProvince] = useState("");
    const [dis_sub_district, setDisSubDistrict] = useState(true);
    const [dis_district, setDisDistrict] = useState(true);
    const { Option } = Select;
    const { t, partnerOnboard, loginStore } = thisProps;

    const onFinish = (values) => {
      console.log("------------ Values ON SUBMIT --------------");
      console.log(values);
      values.subDistrict = subDistrict;
      values.district = District;
      values.province = Province;
      let data = {
        change_type: "PARTNER_INFORMATIONS",
        action: "Add",
        currentData: {},
        newData: {
          partner_code: values.partnerAssignName,
          partner_name_english: values.juristicNameEn,
          partner_name_thai: values.juristicNameTh,
          partner_abbreviation: values.registerApplicationName,

          // Address zone
          address_no: values.houseNo,
          moo: values.moo,
          soi: values.soi,
          road: values.road,
          district_province_id: "1234",
          // district_province_id: values.province,
          district: values.district,
          sub_district: values.subDistrict,
          zip_code: values.zipcode,

          // not sure
          partner_code_parent: values.parentAssignName,

          contacts: [
            {
              name_surname: values.nameSurnameRm,
              citizen_id: values.employeeIdRm,
              office_phone_no: values.officePhoneNoRm,
              work_email: values.workEmailRm,
              employee_id: values.employeeIdRm,
              mobile_no: values.mobileNoRm,
              partner_code: values.department,
              // type: values,
              // user_id: values
            },
            {
              name_surname: values.nameSurnamePartnerContact,
              citizen_id: values.idCardNo,
              office_phone_no: values.officePhoneNoPartnerContact,
              work_email: values.workEmailPartnerContact,
              mobile_no: values.mobileNoPartnerContact,
              // employee_id: values.employeeId,
              // partner_code: values,
              // type: values,
              // user_id: values
            },
            {
              name_surname: values.nameSurnamePartnerIt,
              citizen_id: values.idCardNoIt,
              office_phone_no: values.officePhoneNoPartnerIt,
              work_email: values.workEmailPartnerIt,
              mobile_no: values.mobileNoPartnerIt,
              // employee_id: values.employeeId,
              // partner_code: values,
              // type: values,
              // user_id: values
            },
          ],
        },
        maker_id: loginStore.profile.username,
      };
      partnerOnboard.addPartnerOnboard(data);
      // console.log('Success:', values);
    };

    useEffect(() => {
      partnerOnboard.getProvince({ filter: {} });
      // partnerOnboard.getDistrict({ filter: {} })
      // partnerOnboard.getSubDistrict({ filter: {} })
    }, []);

    const onFinishFailed = (errorInfo) => {
      errorInfo.values.subDistrict = subDistrict;
      errorInfo.values.District = District;
      errorInfo.values.Province = Province;
      console.log("Failed:", errorInfo);
    };

    const _changeSubDistrict = (value) => {
      console.log(value);
      let tmp = partnerOnboard.data_get_sub_district.find((e) => e.id == value);
      let tmp_sub_district = tmp.name_in_thai;
      // i18n.languages[0] == "th" ? tmp.name_in_thai : name_in_english;
      setSubDistrict(tmp_sub_district);
      console.log("Sub District :: ", tmp_sub_district);
    };

    const _changeDistrict = (value) => {
      console.log(value);
      setDisSubDistrict(false);
      let tmp = partnerOnboard.data_get_district.find((e) => e.id == value);
      let tmp_district = tmp.name_in_thai;
      // i18n.languages[0] == "th" ? tmp.name_in_thai : name_in_english;
      setDistrict(tmp_district);
      console.log("District  :: ", tmp_district);
      partnerOnboard.getSubDistrict({
        filter: { where: { district_id: value } },
      });
    };

    const _changeProvince = (value) => {
      // console.log(value)
      setDisDistrict(false);
      let tmp = partnerOnboard.data_get_province.find((e) => e.id == value);
      let tmp_province = tmp.name_in_thai;
      // i18n.languages[0] == "th" ? tmp.name_in_thai : name_in_english;
      setProvince(tmp_province);
      console.log("Provinces :: ", tmp_province);
      partnerOnboard.getDistrict({ filter: { where: { province_id: value } } });
    };

    const _transformTextName = (value) => {
      let newStr = "";
      for (var i = 0; i < value.length; i++) {
        if (value.charAt(i) === value.charAt(i).toUpperCase()) {
          newStr = newStr + " " + value.charAt(i);
        } else {
          i == 0
            ? (newStr += value.charAt(i).toUpperCase())
            : (newStr += value.charAt(i));
        }
      }
      return newStr;
    };

    const props = () => {
      action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
        (onChange = ({ file, fileList }) => {
          if (file.status !== "uploading") {
            console.log(file, fileList);
          }
        });
    };

    const _renderPrefixInput = (prefix, require) => {
      return (
        <Col span={8}>
          <Row style={{ display: "flex", flexDirection: "row" }}>
            <span>{prefix}</span>
            {require && <span style={{ color: "red" }}>* </span>}
          </Row>
        </Col>
      );
    };

    const setMaxLength = (name) => {
      if (name === "parentAssignName") return 5;
      else if (name === "partnerAssignName") return 5;
      else if (name === "registerAppName") return 20;
      else if (name === "Juristic ID") return 20;
      else if (name === "juristicName_th") return 100;
      else if (name === "juristicName_en") return 100;
      else if (name === "houseNo") return 20;
      else if (name === "moo") return 3;
      else if (name === "soi") return 50;
      else if (name === "road") return 30;
      else if (name === "zipcode") return 5;
    };

    const _renderInput = (name, require, keyword) => {
      return (
        <Col span={16}>
          <Form.Item
            name={keyword}
            rules={[
              {
                required: require,
                message: `Please input your ${_transformTextName(name)} !`,
              },
            ]}
          >
            <Input
              placeholder={_transformTextName(name)}
              style={{ width: "80%" }}
              maxLength={setMaxLength(name)}
            />
          </Form.Item>
        </Col>
      );
    };

    const _renderFormInput = (prefix, name, require, keyword) => {
      return (
        <Col
          className="gutter-row"
          span={12}
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        >
          <Row span={12}>
            {_renderPrefixInput(prefix, require)}
            {_renderInput(name, require, keyword)}
          </Row>
        </Col>
      );
    };

    const _renderUploadForm = (name) => {
      return [
        <Col span={4} style={{ padding: 10 }}>
          <span>{name}</span>
        </Col>,
        <Col span={4} style={{ padding: 10 }}>
          <Upload {...props}>
            <Button style={{ backgroundColor: "white", color: "#595959" }}>
              <UploadOutlined />
              Upload
            </Button>
          </Upload>
        </Col>,
      ];
    };

    return (
      <TcrbSpin
        spinning={partnerOnboard.fetching_onboard}
        size="large"
        tip="Loading..."
      >
        <Row>
          <Col span={24}>
            <PageHeader>Partner Registration</PageHeader>
          </Col>
          {/* <Row> */}
          <Form
            style={{ paddingTop: 20 }}
            name="basic"
            initialValues={{
              parentAssignName: "",
              partnerAssignName: "",
              registerAppName: "",
              assignName: "",
              registeredApplicationName: "",
              juristicID: "",
              partnerContactEmail: "",
              partnerContactMobileNo: "",
              partnerContactName: "",
              juristicName_th: "",
              juristicName_en: "",
              status: "",
              houseNo: "",
              moo: "",
              soi: "",
              road: "",
              subDistrict: "",
              district: "",
              province: "",
              zipcode: "",
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} align={"bottom"}>
              {_renderFormInput(
                "Parent Assign Name",
                "parentAssignName",
                true,
                "parentAssignName"
              )}
              {_renderFormInput(
                "Partner Assign Name",
                "partnerAssignName",
                true,
                "partnerAssignName"
              )}
              {_renderFormInput(
                "Juristic ID",
                "Juristic ID",
                true,
                "juristicId"
              )}
              {_renderFormInput(
                "Juristic Name(TH)",
                "Juristic Name(TH)",
                true,
                "juristicNameTh"
              )}
              {_renderFormInput(
                "Juristic Name(En)",
                "Juristic Name(En)",
                true,
                "juristicNameEn"
              )}
              {_renderFormInput(
                "Register App Name",
                "registerAppName",
                true,
                "registerApplicationName"
              )}
            </Row>

            {/* ======================={Address}======================= */}
            <Row
              className="gutter-row"
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col className="gutter-row" span={3}>
                <div>Address </div>
              </Col>
              <Col className="gutter-row" span={4}>
                <Form.Item name="houseNo">
                  <Input placeholder="House No." />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={4}>
                <Form.Item name="moo">
                  <Input placeholder="Moo" />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={4}>
                <Form.Item name="soi">
                  <Input placeholder="Soi" />
                </Form.Item>
              </Col>

              <Col className="gutter-row" span={4}>
                <Form.Item name="road">
                  <Input placeholder="Road" />
                </Form.Item>
              </Col>
            </Row>

            <Row
              className="gutter-row"
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            >
              <Col span={3}></Col>
              <Col className="gutter-row" span={4}>
                <Form.Item name="subDistrict">
                  <Select
                    defaultValue="lucy"
                    disabled={dis_sub_district}
                    style={{ width: 180 }}
                    onChange={_changeSubDistrict}
                  >
                    {partnerOnboard.data_get_sub_district &&
                      partnerOnboard.data_get_sub_district.length > 0 &&
                      JSON.parse(
                        JSON.stringify(partnerOnboard.data_get_sub_district)
                      ).map((e, i) => {
                        let name = e.name_in_thai;
                        i18n.languages[0] == "th";
                        // ? e.name_in_thai
                        // : e.name_in_english;
                        return <Select.Option value={e.id}>{name}</Select.Option>;
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={4}>
                <Form.Item name="district">
                  <Select
                    defaultValue="lucy"
                    disabled={dis_district}
                    style={{ width: 180 }}
                    onChange={_changeDistrict}
                  >
                    {partnerOnboard.data_get_district &&
                      partnerOnboard.data_get_district.length > 0 &&
                      JSON.parse(
                        JSON.stringify(partnerOnboard.data_get_district)
                      ).map((e, i) => {
                        let name = e.name_in_thai;
                        // i18n.languages[0] == "th"
                        //   ? e.name_in_thai
                        //   : e.name_in_english;
                        return <Select.Option value={e.id}>{name}</Select.Option>;
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={4}>
                <Form.Item name="province">
                  <Select
                    defaultValue="lucy"
                    style={{ width: 180 }}
                    onChange={_changeProvince}
                  >
                    {partnerOnboard.data_get_province &&
                      partnerOnboard.data_get_province.length > 0 &&
                      JSON.parse(
                        JSON.stringify(partnerOnboard.data_get_province)
                      ).map((e, i) => {
                        let name = e.name_in_thai;
                        // i18n.languages[0] == "th"
                        //   ? e.name_in_thai
                        //   : e.name_in_english;
                        return <Select.Option value={e.id}>{name}</Select.Option>;
                      })}
                  </Select>
                </Form.Item>
              </Col>
              <Col className="gutter-row" span={4}>
                <Form.Item name="zipcode">
                  <Input placeholder="ZipCode" style={{ width: 180 }} />
                </Form.Item>
              </Col>
            </Row>
            {/* ======================={Address}======================= */}

            {/* ======================={Attachment Files}======================= */}
            <Row>
              <Col>
                <Row>
                  <span style={{ fontSize: 16, color: "#828282" }}>
                    Attachment Files
                  </span>
                </Row>
                <Row>
                  <span style={{ fontSize: 14, color: "#E5E5E5" }}>
                    Only PDF support and the maximum file size is 500 MB
                  </span>
                </Row>
              </Col>
            </Row>

            <Row
              style={{
                borderBottom: "1px solid #C4C4C4",
                marginTop: 10,
                paddingBottom: 10,
              }}
            >
              {_renderUploadForm("NDA")}
              {_renderUploadForm("Contract " + "&" + " MOU")}
              {_renderUploadForm("Company " + "&" + " Authorized Person Docs")}
              {_renderUploadForm("Vendor Valuation")}
              {_renderUploadForm("Others")}
            </Row>
            {/* ======================={Attachment Files}======================= */}

            {/* ======================={RM Contact Info}======================= */}
            <div style={{ fontSize: 16, color: "#828282", marginTop: 10 }}>
              RM Contact Info
            </div>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              align={"bottom"}
              style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}
            >
              {_renderFormInput(
                "Name - Surname",
                "name_surname",
                true,
                "nameSurnameRm"
              )}
              {_renderFormInput(
                "Employee ID",
                "employeeID",
                true,
                "employeeIdRm"
              )}
              {_renderFormInput(
                "Department",
                "department",
                true,
                "departmentRm"
              )}
              {_renderFormInput(
                "Office Phone No.",
                "officePhoneNo",
                true,
                "officePhoneNoRm"
              )}
              {_renderFormInput(
                "Work Email ",
                "workEmail",
                true,
                "workEmailRm"
              )}
              {_renderFormInput("Mobile No ", "mobileNo", true, "mobileNoRm")}
            </Row>
            {/* ======================={RM Contact Info}======================= */}

            {/* ======================={Partner Contact Info}======================= */}
            <div style={{ fontSize: 16, color: "#828282", marginTop: 10 }}>
              Partner Contact Info
            </div>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}
            >
              {_renderFormInput(
                "Name - Surname",
                "name_surname_partner_contact",
                true,
                "nameSurnamePartnerContact"
              )}
              {_renderFormInput("ID Card No. ", "idCardNo", true, "idCardNo")}

              {_renderFormInput(
                "Office Phone No. ",
                "officePhoneNo_partner_contact",
                true,
                "officePhoneNoPartnerContact"
              )}
              {_renderFormInput(
                "Mobile No.",
                "mobileNo_partner_contact",
                true,
                "mobileNoPartnerContact"
              )}

              {_renderFormInput(
                "Work Email ",
                "work_email_partner_contact",
                true,
                "workEmailPartnerContact"
              )}
            </Row>
            {/* ======================={Partner Contact Info}======================= */}
            {/* ======================={Partner IT Security Info}======================= */}
            <div style={{ fontSize: 16, color: "#828282", marginTop: 10 }}>
              Partner IT Security Info
            </div>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ borderBottom: "1px solid #C4C4C4", marginTop: 10 }}
            >
              {_renderFormInput(
                "Name - Surname",
                "name_surname_partner_it",
                true,
                "nameSurnamePartnerIt"
              )}
              {_renderFormInput(
                "ID Card No. ",
                "idCardNoIt",
                true,
                "idCardNoIt"
              )}

              {_renderFormInput(
                "Office Phone No. ",
                "officePhoneNo_partner_it",
                true,
                "officePhoneNoPartnerIt"
              )}
              {_renderFormInput(
                "Mobile No.",
                "mobileNo_partner_it",
                true,
                "mobileNoPartnerIt"
              )}

              {_renderFormInput(
                "Work Email ",
                "work_email_partner_it",
                true,
                "workEmailPartnerIt"
              )}
            </Row>
            {/* ======================={Partner IT Security Info}======================= */}
            <Form.Item style={{ marginTop: 30, textAlign: "left" }}>
              <Row align={'top'}>
                <Button onClick={() => partnerOnboard.showAddPartner(false)}>
                  {t("back")}
                </Button>
                <Button style={{ marginLeft: 20 }} type="primary" htmlType="submit">
                  {t("submit")}
                </Button>
              </Row>

            </Form.Item>
          </Form>

        </Row>
      </TcrbSpin>
    );
  })
);

export default withTranslation("common")(AddPartner);
