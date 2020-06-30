import React, { useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Table, Input, Button, Space } from 'antd';


export const getColumnSearchProps = (dataIndex, handleSearch, handleReset) => {
  const [searchInput, setSearchInput] = useState("")
  const [searchedColumn, setSearchedColumn] = useState("")
  const [searchText, setSearchText] = useState("")
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            setSearchInput(node)
            // this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => {
            setSearchedColumn(dataIndex)
            setSearchText(selectedKeys[0])
            handleSearch(selectedKeys, confirm, dataIndex)
          }}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              console.log(selectedKeys)
              setSearchedColumn(dataIndex)
              setSearchText(selectedKeys[0])
              handleSearch(selectedKeys, confirm, dataIndex)
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
        </Button>
          <Button onClick={() => {
            setSearchText("")
            handleReset(clearFilters)
          }
          } size="small" style={{ width: 90 }}>
            Reset
        </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      // console.log("value >>", value)
      // console.log("record >>", record)
      // console.log("data index >> ", dataIndex)
      return record[dataIndex] && record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
    },


    render: text =>
      searchedColumn === dataIndex ?
        (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
  }
}

