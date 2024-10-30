// ** React Imports
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

// ** Third Party Components
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

// ** Custom Components

// ** Core Imports
import { categoryFormSchema } from "../../../@core/validations/create-category.validation";
import { createNewsCategoryAPI, updateNewsCategoryAPI } from "../../../@core/services/api/articles";


// ** Reactstrap Imports
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

// ** Styles
import "@styles/base/pages/page-blog.scss";
import "@styles/base/plugins/forms/form-quill-editor.scss";
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";
import { onFormData } from "../../../@core/utils/form-data-helper.utils";

const AddNewsCategory = ({ category, isOpen, toggle }) => {
  // ** States
  const [files, setFiles] = useState([]);

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      categoryName: "",
      googleTitle: "",
      iconName: "",
      googleDescribe: "",
    },
    resolver: yupResolver(categoryFormSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const data = onformdata({
        id: category.id || undefined,
        ...values,
        image: category ? (files && files[0]) || category.image : files[0],
        iconAddress: category
          ? (files && files[0]) || category.iconAddress
          : files[0],
      });

      const sendCategory = category
        ? await createNewsCategoryAPI(data)
        : await updateNewsCategoryAPI(data);

      if (sendCategory.success) {
        toast.success(
          `دسته بندی با موفقیت ایجاد شد !`
        );

        // navigate("/Blog/BlogCategory");
      } else {
        toast.error(
          `مشکلی در ایجاد دسته بندی به وجود آمد !`
        );
      }
    } catch (error) {
      toast.error(
        `مشکلی در ایجاد دسته بندی به وجود آمد !`
      );
    }
  };

  useEffect(() => {
    if (category) {
      setValue("categoryName", category.categoryName);
      setValue("iconName", category.iconName);
      setValue("googleTitle", category.googleTitle);
      setValue("googleDescribe", category.googleDescribe);
    }
  }, [category]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}></ModalHeader>
      {/* <div className="blog-edit-wrapper"> */}
      <ModalBody className="px-sm-5 pt-50 pb-5">
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <div>
                  <h2 className="mb-25">افزودن دسته بندی</h2>
                </div>
                <Form
                  className="mt-2"
                  onSubmit={handleSubmit((values) => onSubmit(values))}
                >
                  <Row>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="categoryName">
                        عنوان دسته بندی
                      </Label>
                      <Controller
                        name="categoryName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="categoryName"
                            invalid={errors.categoryName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors.categoryName && (
                        <FormFeedback>
                          {errors.categoryName.message}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="googleTitle">
                        عنوان گوگل
                      </Label>
                      <Controller
                        name="googleTitle"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="googleTitle"
                            invalid={errors.googleTitle && true}
                            {...field}
                          />
                        )}
                      />
                      {errors.googleTitle && (
                        <FormFeedback>
                          {errors.googleTitle.message}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="iconName">
                        نام آیکون
                      </Label>
                      <Controller
                        name="iconName"
                        control={control}
                        render={({ field }) => (
                          <Input
                            id="iconName"
                            invalid={errors.iconName && true}
                            {...field}
                          />
                        )}
                      />
                      {errors.iconName && (
                        <FormFeedback>{errors.iconName.message}</FormFeedback>
                      )}
                    </Col>
                    <Col md="6" className="mb-2">
                      <Label className="form-label" for="Image">
                        عکس دسته بندی
                      </Label>
                      <Controller
                        name="Image"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="file"
                            id="Image"
                            invalid={errors.category?.image && true}
                            {...field}
                          />
                        )}
                      />
                      {errors.category?.image && (
                        <FormFeedback>
                          {errors.category?.image.message}
                        </FormFeedback>
                      )}
                    </Col>
                    <Col md="12" className="mb-2">
                      <Label className="form-label" for="googleDescribe">
                        توضیحات گوگل
                      </Label>
                      <Controller
                        name="googleDescribe"
                        control={control}
                        render={({ field }) => (
                          <Input
                            type="textarea"
                            id="googleDescribe"
                            invalid={errors.googleDescribe && true}
                            {...field}
                          />
                        )}
                      />
                      {errors.googleDescribe && (
                        <FormFeedback>
                          {errors.googleDescribe.message}
                        </FormFeedback>
                      )}
                    </Col>

                    <Col md="12" className="mt-50">
                      <Button type="submit" color="primary" className="me-1">
                        ایجاد دسته بندی
                      </Button>
                      <Button
                        tag={Link}
                        to="/categories"
                        color="secondary"
                        outline
                      >
                        انصراف
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default AddNewsCategory;
