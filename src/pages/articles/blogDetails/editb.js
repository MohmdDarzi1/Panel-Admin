import React, { Fragment, useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input,
  Row,
  Col,
  Button,
  FormFeedback,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createNewsFormSchema } from "../../../../validations/create-news-form.validation";
import { getNewsCategoryListsAPI } from "../../../../services/api/blog/get-news-category-lists-api";
import { convertOptions } from "../../../../utils/convert-options-helper.utils";

const defaultValues = {
  title: "",
  miniDescribe: "",
  googleTitle: "",
  googleDescribe: "",
  newsCategoryId: 0,
};

const EditBlog = ({
  isOpen,

  toggle,
  blogId,
  handleEditClick,
  stepper,
  news,
  setGoogleTitle,
  setGoogleDescribe,
  setTitle,
  setMiniDescribe,
  setKeyword,
  setNewsCategoryId,
  files,
  setFiles,
  setUpdatedData,
}) => {
  const [newsCategoryLists, setNewsCategoryLists] = useState([]);
  const [defaultNewsCategoryList, setDefaultNewsCategoryList] = useState();

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues,
    resolver: news ? undefined : yupResolver(createNewsFormSchema),
  });

  const onSubmit = (data) => {
    if (news) {
      console.log(data);
    } else {
      if (isObjEmpty(errors)) {
        const {
          title,
          miniDescribe,
          googleTitle,
          googleDescribe,
          keyword,
          newsCategoryId,
        } = data;

        setTitle(title);
        setMiniDescribe(miniDescribe);
        setGoogleTitle(googleTitle);
        setGoogleDescribe(googleDescribe);
        setKeyword(keyword);
        setNewsCategoryId(+newsCategoryId.value);
      }
    }
  };

  const animatedComponents = makeAnimated();

  useEffect(() => {
    const fetchNewsCategoryLists = async () => {
      try {
        const getNewsCategoryLists = await getNewsCategoryListsAPI();
        const convertNewsCategoryLists = convertOptions(getNewsCategoryLists);
        setNewsCategoryLists(convertNewsCategoryLists);
      } catch (error) {
        toast.error("مشکلی در دریافت لیست بندی های اخبار به وجود آمد!");
      }
    };

    fetchNewsCategoryLists();
  }, []);

  useEffect(() => {
    if (news) {
      const findCategoryList = newsCategoryLists.find(
        (category) => category.value === news.newsCategoryId
      );

      setDefaultNewsCategoryList(findCategoryList);

      const {
        title,
        googleTitle,
        keyword,
        miniDescribe,
        googleDescribe,
        newsCategoryId,
      } = news;

      setValue("title", title);
      setValue("googleTitle", googleTitle);
      setValue("keyword", keyword);
      setValue("miniDescribe", miniDescribe);
      setValue("googleDescribe", googleDescribe);
      setValue("newsCategoryId", findCategoryList);

      setUpdatedData({
        title,
        googleTitle,
        keyword,
        miniDescribe,
        googleDescribe,
        newsCategoryId,
      });
    }
  }, [news, newsCategoryLists, setValue, setUpdatedData]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered modal-lg"
    >
      <ModalHeader className="bg-transparent" toggle={toggle}>
        اطلاعات را وارد کنید
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="title">
                عنوان
              </Label>
              <Controller
                id="title"
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    id="title"
                    placeholder="عنوان خبر"
                    invalid={!!errors.title}
                    {...field}
                  />
                )}
              />
              {errors.title && (
                <FormFeedback>{errors.title.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleTitle">
                عنوان گوگل
              </Label>
              <Controller
                id="googleTitle"
                name="googleTitle"
                control={control}
                render={({ field }) => (
                  <Input
                    id="googleTitle"
                    placeholder="عنوان گوگل"
                    invalid={!!errors.googleTitle}
                    {...field}
                  />
                )}
              />
              {errors.googleTitle && (
                <FormFeedback>{errors.googleTitle.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="keyword">
                کلمات اصلی
              </Label>
              <Controller
                id="keyword"
                name="keyword"
                control={control}
                render={({ field }) => (
                  <Input
                    id="keyword"
                    placeholder="کلمات اصلی"
                    invalid={!!errors.keyword}
                    {...field}
                  />
                )}
              />
              {errors.keyword && (
                <FormFeedback>{errors.keyword.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="newsCategoryId">
                انتخاب دسته بندی
              </Label>
              <Controller
                id="newsCategoryId"
                name="newsCategoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    className="react-select"
                    classNamePrefix="select"
                    options={newsCategoryLists}
                    isClearable
                    isSearchable
                    components={animatedComponents}
                    {...field}
                  />
                )}
              />
              {errors.newsCategoryId && (
                <FormFeedback>{errors.newsCategoryId.message}</FormFeedback>
              )}
            </Col>
          </Row>
          <Row className="mb-1">
            <Col md="6">
              <Label className="form-label" for="miniDescribe">
                توضیح کوتاه
              </Label>
              <Controller
                control={control}
                id="miniDescribe"
                name="miniDescribe"
                render={({ field }) => (
                  <Input
                    type="textarea"
                    id="miniDescribe"
                    placeholder="توضیح کوتاه"
                    invalid={!!errors.miniDescribe}
                    {...field}
                  />
                )}
              />
              {errors.miniDescribe && (
                <FormFeedback>{errors.miniDescribe.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="googleDescribe">
                توضیحات گوگل
              </Label>
              <Controller
                id="googleDescribe"
                name="googleDescribe"
                control={control}
                render={({ field }) => (
                  <Input
                    type="textarea"
                    id="googleDescribe"
                    placeholder="توضیحات گوگل"
                    invalid={!!errors.googleDescribe}
                    {...field}
                  />
                )}
              />
              {errors.googleDescribe && (
                <FormFeedback>{errors.googleDescribe.message}</FormFeedback>
              )}
            </Col>
            <Col md="6" className="mb-1">
              <Label className="form-label" for="currentImageAddress">
                آپلود عکس
              </Label>
              <Controller
                id="currentImageAddress"
                name="currentImageAddress"
                control={control}
                render={({ field }) => (
                  <Input
                    type="file"
                    id="currentImageAddress"
                    placeholder="آپلود عکس"
                    invalid={!!errors.currentImageAddress}
                    {...field}
                  />
                )}
              />
              {errors.currentImageAddress && (
                <FormFeedback>
                  {errors.currentImageAddress.message}
                </FormFeedback>
              )}
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <Button type="submit" color="primary" className="btn-next">
              <span className="align-middle d-sm-inline-block d-none">
                ویرایش
              </span>
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default EditBlog;
