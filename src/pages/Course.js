import React, { useState } from "react";
import { Modal, Table, Form, Input, Row, Col, Select, Button, Radio, Space,
} from "antd";

import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

const { Item, useForm } = Form;
const { Option } = Select;
const { TextArea } = Input;

const Course = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [form] = useForm();
  const [isEdit, setIsEdit] = useState(false);
  // const [courseData, setCourseData] = useState([]);
  // const [value, setValue] = useState(1);
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Course name",
      dataIndex: "coursename",
      key: "coursename",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    
    {
      title: "Action",
      key: "action",
      width: 200,

      render: (_, record) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-arround",
          }}
        >
          <EditFilled
            onClick={() => {
              handleEdit(record);
              console.log(record);
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
  console.log(state);

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const handleAdd = () => {
    setOpen(true);
  };

  const addData = () => {
    // console.log('add data');
    form.validateFields().then(async (values) => {
      console.log({ values });
      const addRes = await axios.post(
        `http://localhost:9000/api/course/addCourse`,
        {
          coursename: values.coursename,
          duration: values.duration,
        }
      );
      console.log(addRes.data.id);
      if (addRes?.data?.id) {
        setOpen(false);
        getAllCourseList();
        form.resetFields();
      } else {
        console.log("error occured");
      }
    });
  };

  const handleEdit = (record) => {
    setOpen(true);
    setIsEdit(true);
    form.setFieldsValue(record);
  };

  const editData = () => {
    console.log("edit called");
    form.validateFields().then(async (values) => {
      console.log(values);
      const editRes = await axios.put(
        `http://localhost:9000/api/course/${values.id}`,
        {
          coursename: values.coursename,
          duration: values.duration,
          id: values.id,
        }
      );
      console.log(editRes.data[0]);
      if (editRes.data >=  0) {
        console.log(editRes);
        getAllCourseList();
        setOpen(false);
        setIsEdit(false)
        form.resetFields();
      } else {
        console.log("error result"); 
      }
    });
  };

  const handleDelete =async(id) => {
    const deleteRes= await axios.delete("http://localhost:9000/api/course/"+id)
    if(deleteRes?.data?.delRes ==1){
    getAllCourseList();
    }
    console.log(deleteRes)
    
  };

  const getAllCourseList = async () => {
    const courseRes = await axios.get("http://localhost:9000/api/course/courses");
    console.log(courseRes.data);
    dispatch({
      type: "INSERT_DATA",
      payload: {
        values: courseRes.data,
      },
    });
  };
  useEffect(() => {
    getAllCourseList();
  }, []);

  return (
    <>
      <div>
        <Table dataSource={state.course} columns={columns} />
        <Button type="primary" onClick={handleAdd}>
          ADD
        </Button>
      </div>
      <Modal
        titel="coursedetails"
        style={{ top: 20 }}
        height={1000}
        open={open}
        onOk={() => {
          console.log(form.getFieldValue('id'))
          if (form.getFieldValue('id')) {
            editData();
          } else {
            addData();
          }
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields()
        }}
      >
        <Form form={form}>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>Course name</span>
              <Item name="coursename">
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>Duration</span>

              <Item name="duration">
                <Input />
              </Item>
            </Col>
          </Row>
          <Item name={"id"}></Item>
        </Form>
      </Modal>
    </>
  );
};
export default Course;
