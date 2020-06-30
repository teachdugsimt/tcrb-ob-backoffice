import React from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button, Space } from 'antd';
import { inject, observer } from 'mobx-react'

export const getColumnSearchProps = dataIndex =>
  inject('customerServiceEnquiry')
    (observer((props) => {
      const { customerServiceEnquiry } = props
      const [obj, setobj] = useState(null)
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              // ref={node => {
              //   this.searchInput = node;
              // }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              // onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => /*this.handleSearch(selectedKeys, confirm, dataIndex)*/ { }}
                icon={<SearchOutlined />}
                size="small"
                style={{ width: 90 }}
              >
                Search
        </Button>
              <Button onClick={() => /*this.handleReset(clearFilters)*/ { }} size="small" style={{ width: 90 }}>
                Reset
        </Button>
            </Space>
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            // setTimeout(() => this.searchInput.select());
          }
        },
        render: text => text
        // this.state.searchedColumn === dataIndex ?
        // (
        // <Highlighter
        //   highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //   searchWords={[this.state.searchText]}
        //   autoEscape
        //   textToHighlight={text.toString()}
        // />
        // ) : (
        // text
        // ),
      }
    }))
