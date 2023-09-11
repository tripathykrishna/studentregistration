//table with add and edit button
// form
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Modal, Table, Form, Input, Row, Col, Select, Button } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const { Item, useForm } = Form;
const defultTableData = [
  {
    id: 1,
    name: "krishna",
    age: "30",
    address: "garadpur",
    date: "2023-05-12T02:39:35.922Z",
    gender: "Female",
    section: "C",
    class: "4",
    key: "krishna",
  },
  {
    id: 2,
    name: "krishna",
    age: "25",
    address: "garadpur",
    date: "2023-05-12T02:39:35.922Z",
    gender: "Other",
    section: "C",
    class: "4",
    key: "kishan",
  },
  {
    id: 3,
    name: "kuni",
    age: "44",
    address: "bhadrak",
    date: "2023-05-10T02:42:29.094Z",
    gender: "Male",
    section: "A",
    class: "3",
    key: "kuni",
  },
];
const Student = () => {
  const state = useSelector((state) => state);

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [studentData, setStudentData] = useState(defultTableData);
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      id: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      id: "id",
    },
    {
      title: "DOB",
      dataIndex: "DOB",
      key: "DOB",
      id: "DOB",
    },
    {
      title: "rollno",
      dataIndex: "rollno",
      key: "rollno",
      id: "rollno",
    },
    {
      title: "class",
      dataIndex: "class",
      key: "class",
      id: "class",
    },
    {
      title: "section",
      dataIndex: "section",
      key: "section",
      id: "section",
    },

    {
      title: "Action",
      key: "Action",
      width: 200,
      render: (name, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <EditFilled
            onClick={() => {
              handleEdit(record);
              console.log(record, name);
            }}
          />
          <DeleteFilled
            onClick={() => {
              handleDelete(record.id);
            }}
          />
        </div>
      ),
    },
  ];

  const handleEdit = (record) => {
    setOpen(true);
    setIsEdit(true);
    // setEditId(record.id)
    form.setFieldsValue(record);
  };
  const handleAdd = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const addData = () => {
    form.validateFields().then(async (values) => {
      const addRes = await axios.post(
        `http://localhost:9000/api/student/addStudent`,
        {
          name: values.name,
          DOB: values.DOB,
          rollno: values.rollno,
          class: values.class,
          section: values.section,
        }
      );
      console.log( addRes.data.id); 
      if (addRes?.data?.id) {
        getAllStudentList();
        setOpen(false);
        form.resetFields();
      } else {
        console.log("error occured");
      }
    });
  };
  const editData = () => {
    console.log("edit called");
    form.validateFields().then(async (values) => {
      console.log(values);
      const editRes = await axios.put(
        `http://localhost:9000/api/student/${values.id}`,
        {
          name: values.name,
          DOB: values.DOB,
          id: values.id,
          rollno:values.rollno,
          class:values.class,
          section:values.section
        }
      );
      console.log(editRes.data[0])
      if (editRes.data >= 0) {
        console.log(editRes);
        getAllStudentList();
        setOpen(false);
        // setIsEdit(false)
        form.resetFields();
      } else {
        console.log("error result");
      }
    });
  };
  const handleDelete =async(id) => {
   const deleteRes =await axios.delete("http://localhost:9000/api/student/delete/"+id)
   if(deleteRes?.data?.delRes ==1){
    getAllStudentList();
   } 
   console.log(deleteRes)
  };
 
  const getAllStudentList = async () => {
    const studentRes = await axios.get("http://localhost:9000/api/student/students");
    console.log(studentRes.data);
    dispatch({
      type: "INSERT_DATA",
      payload: {
        values: studentRes.data,
      },
    });
  };
  useEffect(() => {
    getAllStudentList();
  }, []);

  return (
    <>
      <div>
        <Table columns={columns} dataSource={state.student} />
        <Button type="primary" onClick={handleAdd}>
          ADD
        </Button>
      </div>
      <Modal
        title="Student Details"
        style={{ top: 20 }}
        open={open}
        onOk={() => {
          if (form.getFieldValue("id")) {
            editData();
          } else {
            addData();
          }
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      >
      
        <Form form={form}>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>Name</span>
              <Item name="name" required={true}>
                <Input />
              </Item>
            </Col>

            <Col span={12}>
              <span>DOB</span>
              <Item name="DOB" required={true}>
                <Input />
              </Item>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            <Col span={24}>
              <span>ROLLNO</span>
              <Item name="rollno">
                <Input />
              </Item>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>CLASS</span>
              <Item name="class">
                <Input />
              </Item>
            </Col>

            <Col span={12}>
              <span>SECTION</span>
              <Item name="section">
                <Select>
                  {["A", "B", "C", "D"].map((e) => (
                    <Option key={e}>{e}</Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <Item name="id"></Item>
        </Form>
      </Modal>
    </>
  );
};
export default Student;
