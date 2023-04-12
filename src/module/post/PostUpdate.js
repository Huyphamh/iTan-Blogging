import React from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import { Label, LabelStatus } from "../../components/label";
import Input from "../../components/input/Input";
import ImageUpload from "../../components/image/ImageUpload";
import Dropdown from "../../components/dropdown/Dropdown";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import Toggle from "../../components/toggle/Toggle";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { useForm } from "react-hook-form";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import { useState } from "react";
import { postStatus } from "../../utils/constants";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { toast } from "react-toastify";
import slugify from "slugify";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const {
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const imageUrl = getValues("image");
  const imageName = getValues("image_name");
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deletePostImage);
  async function deletePostImage() {
    const colRel = doc(db, "users", postId);
    await updateDoc(colRel, {
      avatar: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  const updatePostHandler = async (values) => {
    if(!isValid) return;
    const docRef = doc(db, "posts", postId);
    values.status = Number(values.status);
    values.slug = slugify(values.slug || values.title, { lower: true });
    await updateDoc(docRef, {
      ...values,
      image,
      content,
    });
    toast.success("update Post thành công!");
  };

  const watchHot = watch("hot");
  const watchStatus = watch("status");
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.data()) {
        reset(docSnapshot.data());
        setSelectCategory(docSnapshot.data()?.category || "");
        setContent(docSnapshot.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  const [selectCategory, setSelectCategory] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function getCategoriesData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getCategoriesData();
  }, []);
  const handleClickOption = async (item) => {
    // setValue("categoryID", item.id);
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  };

  if (!postId) return null;
  return (
    <div>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updatePostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your Slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              handleDeleteImage={handleDeleteImage}
              className="h-[250px]"
              progress={progress}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select placeholder="Select the category"></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Option>
                  ))}
              </List>
            </Dropdown>
            {selectCategory?.name && (
              <span className="inline-block p-3 rounded-lg bg-green-200 text-sm font-medium">
                {selectCategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="mb-10">
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill theme="snow" value={content} onChange={setContent} />
            </div>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              on={watchHot === true}
              onClick={() => setValue("hot", !watchHot)}
            ></Toggle>
          </Field>
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                // onClick={() => setValue("status", "approved")}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                // onClick={() => setValue("status", "pending")}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                // onClick={() => setValue("status", "reject")}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          type="submit"
          className="mx-auto w-[250px]"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
