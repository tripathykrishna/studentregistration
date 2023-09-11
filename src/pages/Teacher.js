import React, { useState } from "react";
import { useEffect } from "react";
import { Modal, Table, Form, Input, Row, Col, Select, Button } from "antd";
import { EditFilled, DeleteFilled} from "@ant-design/icons";
import { useDispatch,useSelector } from "react-redux";
import axios from "axios";
const { Option } = Select;
const { Item, useForm } = Form;


const teacherdata = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "bhadrak",
    phoneno: 9090720389,
    gender: "female",
    exprience: "2yrs",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "lunia",
    phoneno: 9348345308,
    gender: "male",
    exprience: "1yrs",
  },
];

const Teacher = () => {
  const state =useSelector((state)=>state)
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(false); 
  const dispatch =useDispatch();
  const [teacherData, setTeacherData] = useState([]);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "SALARY",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "DOJ",
      dataIndex: "DOJ",
      key: "DOJ",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
      )
    },
  ];
  
  const handleAdd = () => {
    setOpen(true);
    setIsEdit(false);
  };
  const addData = () => {
    form.validateFields().then(async(values) => {
      console.log({ ...values, id: Date.now() });
      const addRes = await
      axios.post(`http://localhost:9000/api/teacher/addTeacher`,{
       name:values.name,
       salary:values.salary,
       DOJ:values.DOJ,
       phone:values.phone
      })
      if(addRes?.data?.id){
        getAllTeachearList();
        setOpen(false);
        form.resetFields();
      }
      else{
       console.log("error data") 
      }
    });
  };
  const editData = () => {
    console.log("edit called");
    form.validateFields().then(async(values) => {
      const editRes= await axios.put(`http://localhost:9000/api/teacher/${values.id}`,{
       name:values.name,
       salary:values.salary,
       DOJ:values.DOJ,
       phone:values.phone,
       id:values.id
      })
      console.log(editRes.data[0])
      if(editRes.data >= 0){
        getAllTeachearList();
        setOpen(false);
        form.resetFields();
      }else{
        console.log("notfound")
      }
      
    
    });
  };
  const handleEdit = (record) => {
    setOpen(true);
    setIsEdit(true);
    form.setFieldsValue(record)
  };
  const handleDelete = async(id) => {
   const deleteRes = await axios.delete("http://localhost:9000/api/teacher/delete/"+id
    
   )
   if(deleteRes?.data?.delRes ==1){
    getAllTeachearList();
   }
   console.log(deleteRes)
  };
 
  const getAllTeachearList = async()=>{
    const teacherRes=await
    axios.get("http://localhost:9000/api/teacher/teachers")
    console.log(teacherRes)
     dispatch({
      type:"INSERT_DATA",
      payload:{
        values:teacherRes.data
      }
     })
  }
  useEffect(()=>{
    getAllTeachearList();
  },[])


  return (
    <>
      <div>
      <Table dataSource={state.teacher} columns={columns} />;
      <Button type="primary" onClick={handleAdd}>
        ADD
      </Button>
      </div>
      <Modal
        title="Teacher Details"
        style={{ top: 10 }}
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
              <span>SALARY</span>
              <Item name="salary" required={true}>
                <Input type="number" />
              </Item>
            </Col>
          </Row>

          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>DOJ</span>
              <Item name="DOJ">
                <Input />
              </Item>
            </Col>

            <Col span={12}>
              <span>PHONE:</span>
              <Item name="phone">
                <Input/>
              </Item>
            </Col>
          </Row>
          <Item name="id"></Item>
        </Form>
      </Modal>
    </>
  );
};

export default Teacher;
