import React, { useState } from "react";
import {
  Modal,
  Table,
  Form,
  Input,
  Row,
  Col,
  Select,
  Button,
  Radio,
  Space,
} from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

const { Item, useForm } = Form;
// const { Option } = Select;
// const { TextArea } = Input;
const Topics = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [form] = useForm();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [coursedata, setCourseData] = useState([]);
  // const [data, setData] = useState();
  // const [courseData, setCourseData] = useState([]);
  // const [value, setValue] = useState(1);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "courseId",
      dataIndex: "courseId",
      key: "courseId",
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
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      duration: "2per",
      courseId: "1",
    },
    {
      key: "2",
      topicname: "John",
      duration: "4weeks",
      courseId: "2",
    },
  ];

  const handleAdd = () => {
    setOpen(true);
    form.setFieldsValue();
  };

  const addData = () => {
    form.validateFields().then(async (values) => {
      const addRes = await axios.post(
        `http://localhost:9000/api/topic/addTopic`,
        {
          name: values.name,
          duration: values.duration,
          courseId: values.courseId,
        }
      );
      if (addRes?.data?.id) {
        getAllTopicList();
        setOpen(false);
        form.validateFields();
      } else {
        console.log("error");
      }
    });
  };

  const handleEdit = (record) => {
    setOpen(true);
    setIsEdit(true);
    form.setFieldsValue(record);
  };

  const editData = (record) => {
    form.validateFields().then(async (values) => {
      const editRes = await axios.put(
        `http://localhost:9000/api/topic/${values.id}`,
        {
          name: values.name,
          duration: values.duration,
          courseId: values.courseId,
        }
      );
      if (editRes.data >= 0) {
        getAllTopicList();
        setOpen(false);
        setIsEdit(false);
        form.resetFields();
      } else {
        console.log("error result");
      }
    });
  };

  const handleDelete = async (id) => {
    const deleteRes = await axios.delete(
      `http://localhost:9000/api/topic` + id
    );
    if (deleteRes.data == 1) {
      getAllTopicList();
    }
    console.log(deleteRes);
  };
  const getAllTopicList = async () => {
    const topicRes = await axios.get(`http://localhost:9000/api/topic/topices`);
    console.log(topicRes);
    dispatch({
      type: "INSERT_DATA",
      payload: {
        values: topicRes.data,
      },
    });
  };

  const getAllCourseList = async () => {
    const courseRes = await axios.get(
      "http://localhost:9000/api/course/courses"
    );
    console.log(courseRes.data);
    setCourseData(courseRes.data);
  };
  useEffect(() => {
    getAllCourseList();
  }, []);

  useEffect(() => {
    getAllTopicList();
  }, []);

  return (
    <>
      <div>
        <Table dataSource={state.topics} columns={columns} />
        <Button type="primary" onClick={handleAdd}>
          ADD
        </Button>
      </div>
      <Modal
        titel="topicdetails"
        style={{ top: 20 }}
        height={1000}
        open={open}
        onOk={() => {
          console.log(form.getFieldValue("id"));
          if (form.getFieldValue("id")) {
            editData();
          } else {
            addData();
          }
          setOpen(true);
        }}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      >
        <Form form={form}>
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>Topic name</span>
              <Item name="name">
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
          <Row gutter={[10, 0]}>
            <Col span={12}>
              <span>courseId</span>
              <Item name="courseId">
                <Select placeholder="Select courseid"
                onSelect = {(e)=>{
                  form.setFieldValue("courseId",e)
                }}>
                  {coursedata.map((option) => (
                    <Select.Option key={option.id} value={option.id}>
                      {option.coursename}
                    </Select.Option>
                  ))}
                </Select>
              </Item>
            </Col>
          </Row>
          <Item name={"id"}></Item>
        </Form>
      </Modal>
    </>
  );
};

export default Topics;
