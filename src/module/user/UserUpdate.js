import React, { useEffect } from "react";
import DashboardHeading from "../dashboard/DashboardHeading";
import ImageUpload from "../../components/image/ImageUpload";
import Field from "../../components/field/Field";
import { Label } from "../../components/label";
import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import Radio from "../../components/checkbox/Radio";
import FieldCheckboxes from "../../components/field/FieldCheckboxes";
import Button from "../../components/button/Button";
import { userRole, userStatus } from "../../utils/constants";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase-app/firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import Swal from "sweetalert2";
import { useAuth } from "../../contexts/auth-context";

const UserUpdate = () => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [params] = useSearchParams();
  const userId = params.get("id");
  const watchStatus = watch("status");
  const watchRole = watch("role");

  const handleUpdateUser = async (values) => {
    const colRel = doc(db, "users", userId);
    await updateDoc(colRel, {
      ...values,
      avatar: image,
    });
    toast.success("Update thành công");
    
  };
  const { userInfo } = useAuth();
  // const handleUpdateUser = async (values) => {
  //   if (!isValid) return;
  //   if (userInfo?.role !== userRole.ADMIN) {
  //     Swal.fire("Failed", "You have no right to do this action", "warning");
  //     return;
  //   }
  //   try {
  //     const colRef = doc(db, "users", userId);
  //     await updateDoc(colRef, {
  //       ...values,
  //       avatar: image,
  //     });
  //     toast.success("Update user information successfully!");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Update user failed!");
  //   }
  // };
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);
  async function deleteAvatar() {
    const colRel = doc(db, "users", userId);
    await updateDoc(colRel, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);
  useEffect(() => {
    async function fetchData() {
      const colRel = doc(db, "users", userId);
      const docData = await getDoc(colRel);
      reset(docData && docData.data());
    }
    fetchData();
  }, [userId, reset]);

  if (!userId) return null;
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full">
          <ImageUpload
            className="!rounded-full h-full"
            image={image || imageUrl}
            onChange={handleSelectImage}
            handleDeleteImage={handleDeleteImage}
            progress={progress}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
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
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
          isLoading={isSubmitting}
          disable={isSubmitting}
        >
          Update User
        </Button>
      </form>
    </div>
  );
};

export default UserUpdate;
