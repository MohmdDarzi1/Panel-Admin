// ** React Imports
import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";

// ** Third Party Components
import { Eye } from "react-feather";
import { useForm } from "react-hook-form";
import UserAddRole2 from "./addRole/UserAddRole2";
import http from "../../@core/interceptors/interceptors";

// ** Custom Components

// ** FAQ Illustrations

const rolesArr = [
  "User Management",
  "Content Management",
  "Disputes Management",
  "Database Management",
  "Financial Management",
  "Reporting",
  "API Control",
  "Repository Management",
  "Payroll",
];

const RoleCards = ({ dataToShow }) => {
  // ** States
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("Add New");
  const [modalData, setModalData] = useState([]);
  const [roles, setRoles] = useState([]);
  // console.log("first", roles)

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { roleName: "" } });

  const onSubmit = (dataToShow) => {
    if (dataToShow.roleName.length) {
      setShow(false);
    } else {
      setError("roleName", {
        type: "manual",
      });
    }
  };

  const onReset = () => {
    setShow(false);
    reset({ roleName: "" });
  };

  const handleModalClosed = () => {
    setModalType("Add New");
    setValue("roleName");
  };

  const [modal, setModal] = useState(null);
  // console.log("rowuserRoles",row)

  // const [dataToShow, setDataToShow] = useState();
  const [refetch, setRefetch] = useState(1);

  const fetchUserListData = async (id) => {
    const res = await http(`/User/UserDetails/${id}`);
    setRoles(res.roles);

    // try {
    //   const res = await http(`/User/UserMannage`);
    //   console.log("resdata2", res);
    //   // setDataToShow(res)

    //   const promisArr = [];
    //   for (let index = 0; index < res.roles.length; index++) {
    //     promisArr.push(
    //       http(
    //         `/User/UserMannage?roleId=${res.roles[index].id}&PageNumber=1&RowsOfPage=${res.totalCount}`
    //       )
    //     );
    //   }
    //   const results = await Promise.all(promisArr);
    //   results.forEach((result, index) => {
    //     res.roles[index]["userCount"] = result.listUser.length;
    //     res.roles[index]["userList"] = result.listUser;
    //     res.roles[index].userList.forEach((user) => {
    //       user.role = res.roles[index].roleName;
    //     });
    //   });
    //   console.log(res);
    //   setDataToShow(res);
    // } catch (error) {
    //   console.log("test", error);
    // }
  };

  // useEffect(() => {
  //   fetchUserListData();
  // }, [refetch]);

  return (
    <Fragment>
      <Row>
        {dataToShow.map((item, index) => {
          console.log("dataToShow", item);
          return (
            <Col key={index} xl={4} md={6}>
              <Card>
                <CardBody>
                  <div className="d-flex justify-content-between">
                    <span>{`تعداد کاربران ${item.userCount} نفر`}</span>
                    {/* <AvatarGroup  /> */}
                  </div>
                  <div className="d-flex justify-content-between align-items-end mt-1 pt-25">
                    <div className="role-heading">
                      <h4 className="fw-bolder">{item.roleName}</h4>
                      {/* <Link
                        to='/'
                        className='role-edit-modal'
                        onClick={e => {
                          e.preventDefault()
                          setModalType('Edit')
                          setShow(true)
                        }}
                      >
                        <small className='fw-bolder'> تغییر دسترسی</small>
                      </Link> */}
                    </div>
                    <Link
                      to=""
                      className="text-body"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalType("لیست اعضا");
                        setModalData(item.userList);
                        setShow(true);
                      }}
                    >
                      {" "}
                      <small className="fw-bolder"> مشاهده اعضا </small>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Modal
        isOpen={show}
        onClosed={handleModalClosed}
        toggle={() => setShow(!show)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader
          className="bg-transparent"
          toggle={() => setShow(!show)}
        ></ModalHeader>
        <ModalBody className="px-5 pb-5">
          <div className="text-center mb-4">
            <h1>{modalType}</h1>
            <p>در این قسمت میتوانید لیست اعضای دارای این نقش را مشاهده کنید</p>
          </div>
          <Row tag="form" onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              {/* <h4 className="mt-2 pt-50">Role Permissions</h4> */}
              <Table className="table-flush-spacing" responsive>
                <tbody>
                  <tr>
                    <td className="text-nowrap fw-bolder">
                      <span className="me-50"> نام </span>
                    </td>
                    <td className="text-nowrap fw-bolder">
                      <span className="me-50"> شماره تماس</span>
                    </td>

                    <td className="text-nowrap fw-bolder">
                      <span className="me-50"> نمایش جزییات </span>
                    </td>
                    <td className="text-nowrap fw-bolder">
                      <span className="me-50"> تغییر نقش </span>
                    </td>

                    <td>
                      <div className="form-check"></div>
                    </td>
                  </tr>
                  {modalData.map((user, index) => {
                    const toggleModal = (idex) => {
                      if (modal !== idex) {
                        setModal(idex);
                      } else {
                        setModal(null);
                      }
                    };
                    const handleAddRoleClick = () => {
                      toggleModal(user.id);
                      console.log("userdatadata", user);
                    };
                    return (
                      <>
                        <tr key={index}>
                          <td className="text-nowrap fw-bolder p-0">
                            {user.lname + " " + user.fname}
                          </td>

                          <td className="text-nowrap fw-bolder">
                            {user.phoneNumber}
                          </td>

                          <td className="text-nowrap fw-bolder p-0 text-center">
                            <Link to={`/Users/${user.id}`}>
                              <Eye className="font-medium-3 text-body p-0" />
                            </Link>
                          </td>
                          <td className="text-nowrap fw-bolder p-0">
                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                handleAddRoleClick(),
                                  fetchUserListData(user.id);
                              }}
                            >
                              تغییر{" "}
                            </button>
                          </td>
                        </tr>
                        <UserAddRole2
                        
                          modal={modal}
                          id={user.id}
                          userName={user.fname + " " + user.lname}
                          toggleModal={toggleModal}
                          userRoles={roles} // Pass user role here
                          setShow={setShow}
                        />
                      </>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default RoleCards;
