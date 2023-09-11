// import React ,{useState} from "react";
// import Student from "./student";
// // import Course from "./Course";
// // import Teacher from "./Teacher";

// import {
//   Modal,
//   Table,
//   Form,
//   Input,
//   Row,
//   Col,
//   Select,
//   Button,
//   Radio,
//   Space,
// } from "antd";

// import { EditFilled, DeleteFilled } from "@ant-design/icons";

//  const { Item, useForm } = Form;
// const { Option } = Select;

// function Coursestudentteacher() {
 
//   const [open, setOpen] = useState(false);
//    const [form] = useForm();

//   const columns = [
//     {
//       title: "id",
//       dataIndex: "id",
//       key: "id",
//     },
//     {
//       title: "selectedTeacherId",
//       dataIndex: "selectedTeacherId",
//       key: "selectedTeacherId",
//     },

//     {
//       title: "selectedStudentId",
//       dataIndex: "selectedStudentId",
//       key: "selectedStudentId",
//     },

//     {
//       title: "Action",
//       key: "action",
//       width: 200,

//       render: (_, record) => (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-arround",
//           }}
//         >
//           <EditFilled
//           // onClick={() => {
//           //   handleEdit(record);
//           //   console.log(record);
//           // }}
//           />
//           <DeleteFilled
//           // onClick={() => {
//           //   handleDelete(record.id);
//           // }}
//           />
//         </div>
//       ),
//     },
//   ];
  

//   const data = [
//     {
//       key: "1",
//       id: 1,
//       selectedTeacherId: 1,
//       selectedStudentId: 3,
//     },
//   ];
//   return (
//     <>
//       <div>
//         <Table dataSource={data} columns={columns} />
//         <Button type="primary">ADD</Button>
//       </div>
//       <Modal
//         titel="Selected Data"
//         style={{ top: 20 }}
//         height={1000}
//         open={open}
//         onOk={() => {
//             setOpen(true);
//         //   if (isEdit) {
//         //     editData();
//         //   } else {
//         //     addData();
//         //   }
//         }}
//         onCancel={() => {
//           setOpen(false);
//         }}
//       >
//         <Form form={form}>
//         <Row gutter={[10, 0]}>
//             <Col span={12}>
//               <span>selected teacher</span>
//               <Select
//                 style={{
//                   width: 200,
//                 }}
//               >
//                 {/* {state.teacher.map((e) => (
//                   <Option key={e.name}>{e.name}</Option>
//                 ))} */}
//               </Select>
//             </Col>
//             <Col span={12}>
//               <span>selected studuents</span>
//               <Select
//                 style={{
//                   width: 200,
//                 }}
//               >
//                 {/* {state.student.map((e) => (
//                   <Option key={e.name}>{e.name}</Option>
//                 ))} */}
//               </Select>
//             </Col>
//           </Row>
//         </Form>
//       </Modal> 
//     </>
//   );
// }

// export default Coursestudentteacher;
