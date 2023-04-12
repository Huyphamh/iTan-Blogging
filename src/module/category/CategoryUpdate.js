import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import DashboardHeading from "../dashboard/DashboardHeading";
import Field from "../../components/field/Field";
import { Label } from "../../components/label";
import Input from "../../components/input/Input";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import { useForm } from "react-hook-form";
import Radio from "../../components/checkbox/Radio";
import Button from "../../components/button/Button";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-app/firebase-config";
import { categoryStatus } from "../../utils/constants";
import slugify from "slugify";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
    const {control, reset, watch, handleSubmit, formState:{isSubmitting}} = useForm({
        mode:"onChange",
        defaultValues:{}
    })
  const [params] = useSearchParams();
  const categoryID = params.get("id");
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData(){
        const colRef = doc(db,"categories", categoryID);
        const singleDoc = await getDoc(colRef);
        reset(( singleDoc).data())
    }
    fetchData();
  },[categoryID, reset])
  const watchStatus = watch("status");
  const  handleUpdateCategory = async(values) =>{
    const colRef = doc(db, "categories", categoryID);
    await updateDoc(colRef,{
        name: values.name,
        slug: slugify(values.slug || values.name, {lower:true}),
        status: Number(values.status),
    });
    toast.success("Cập nhật thành công!!")
    navigate("/manage/category")
  };

  if (!categoryID) return null;
  

  return (
    <div>
      <DashboardHeading
        title="Update Category"
        desc={`Update your category id: ${categoryID}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          className="mx-auto w-[200px]"
          type="submit"
          disable={isSubmitting}
          isLoading={isSubmitting}
        >
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
