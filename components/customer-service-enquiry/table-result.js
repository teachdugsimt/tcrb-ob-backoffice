import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import styled from 'styled-components';
import { columnsTranInfo, columnsPartnerInfo, columnsAccInfo } from './table-column';
import { Table, Tabs } from 'antd';

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const TableSet = () => (
  <Tabs defaultActiveKey="1" onChange={callback}>
    <TabPane tab="Transaction Info" key="1">
      <Table columns={columnsTranInfo} dataSource={[]} />
    </TabPane>
    <TabPane tab="Partner Info" key="2">
      <Table columns={columnsPartnerInfo} dataSource={[]} />
    </TabPane>
    <TabPane tab="Account Info" key="3">
      <Table columns={columnsAccInfo} dataSource={[]} />
    </TabPane>
  </Tabs>
);

export const TableResult =
  inject('customerServicesMenuStore')
    (observer((props) => {

      return (
        <TableSet />
      )

    }))
