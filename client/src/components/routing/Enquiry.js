import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Button, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Axios from "axios";
import { bh } from "../config";

const Enquiry = () => {
  const [transactions, setTransactions] = useState({});

  useEffect(() => {
    Axios.get(bh + "/getUser", {})
      .then((response) => {
        const user = localStorage.getItem("email");
        const result = response.data;
        console.log(result);
        if (user === "admin_ascendas@gmail.com") {
          let output = {};
          for (let i = 0; i < result.length; i++) {
            for (const property in result[i].transactions) {
              output[property] = result[i].transactions[property];
            }
          }
          setTransactions(output);
        } else {
          for (let i = 0; i < result.length; i++) {
            if (result[i].email === user) {
              setTransactions(result[i].transactions);
              break;
            }
          }
        }
      })
      .catch((err) => {
        console.warn(err.response);
      });
  }, []);

  const keys = Object.keys(transactions);
  const values = Object.values(transactions);
  const data = [];
  for (let i = 0; i < keys.length; i++) {
    let State = null;
    if (values[i] === "0000") {
      State = "success";
    } else if (values[i] === "69420") {
      State = "pending";
    } else {
      State = "fail";
    }
    data.push({
      ReferenceCode: keys[i],
      OutcomeCode: [values[i]],
      State: [State],
    });
  }
  console.log(data);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          id={"input_code_search_"+dataIndex}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            id={"search_enquiry_"+dataIndex}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            id={"reset_enquiry_"+dataIndex}
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Reference Code",
      dataIndex: "ReferenceCode",
      key: "ReferenceCode",
      width: "30%",
      ...getColumnSearchProps("ReferenceCode"),
    },
    {
      title: "Outcome",
      dataIndex: "State",
      key: "State",
      ...getColumnSearchProps("State"),
      render: (_, { State }) => (
        <>
          {State.map((state) => {
            let color = null;
            if (state === "success") {
              color = "green";
            } else if (state === "pending") {
              color = "yellow";
            } else {
              color = "volcano";
            }
            return (
              <Tag color={color} key={state}>
                {state.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
      sorter: (a, b) => a.State[0].localeCompare(b.State),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Reason",
      dataIndex: "OutcomeCode",
      key: "OutcomeCode",
      width: "40%",
      render: (_, { OutcomeCode }) => (
        <>
          {OutcomeCode.map((code) => {
            switch (code) {
              case "0000":
                return "Success!";
              case "0001":
                return "Member not found";
              case "0002":
                return "Member name mismatch";
              case "0003":
                return "Member account closed";
              case "0004":
                return "Member account suspended";
              case "0005":
                return "Member ineligible for accrual";
              case "0099":
                return "Unable to process, please contact support for more information";
              default:
                return "Pending";
            }
          })}
        </>
      ),
    },
  ];
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Enquire your transaction status here
      </h1>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 8 }} />
    </>
  );
};

export default Enquiry;
