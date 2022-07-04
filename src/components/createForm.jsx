import React from "react";
import { Box, ButtonBase, Container, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask, getAddressStates } from "../store/address/addressSlice";
import styles from "./styles.module.css";
const CreateForm = ({ setAddPage }) => {
  const { isError ,allStates } = useSelector((state) => state.address);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required("Please Enter name"),
    description: Yup.string().required("Please Enter description"),
    floor_number: Yup.number().required("Please Enter floor_number"),
    apartment_number: Yup.number().required("Please Enter apartment_number"),
    area: Yup.string().required("Please Enter area"),

  });

  const formik = useFormik({
    initialValues: {
        name: "",
        floor_number: "",
        apartment_number: "",
        area: "",
        description: "",
    },

    onSubmit: (values) => {
      console.log(values);
      values.area=+values.area
      dispatch(addTask(values));
      setAddPage(false);
    },
    validationSchema,
  });

  React.useEffect(() => {

    dispatch(getAddressStates());

  }, []);

// const listItem = allStates.
  return (
    <Container>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          {/* ------------From input-------------- */}
          <div className="mb-2 col-sm-12 col-md-12">
          <label
                htmlFor="area"
                className={`form-label  ${styles.labelStyle}`}
              >
                Area :
              </label>
              <select
                className={styles.selectStyle}
                name="area"
                {...formik.getFieldProps("area")}
              >
                {/* {allStates&&allStates.map((index,row)=>
                  (<option  value={row.name}>{row.name_ar}</option>)
                ) } */}
                 {allStates.map((row,index)=>(
                 <option  key={index} value={row.id}>{row.name}</option>
              ))}
                
              </select>
            {formik.touched.area && formik.errors.area ? (
              <div className={styles.errorStyle}>
                {formik.errors.area}
              </div>
            ) : null}
          </div>
          {/* ------------name-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label htmlFor="name" className={`form-label  ${styles.labelStyle}`}>
            Name
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="text"
              placeholder="Enter Your name"
              name="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className={styles.errorStyle}>{formik.errors.name}</div>
            ) : null}
          </div>
          {/* ------------Description-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label
              htmlFor="description"
              className={`form-label  ${styles.labelStyle}`}
            >
              Description
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="text"
              placeholder="Enter Your description"
              name="description"
              {...formik.getFieldProps("description")}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className={styles.errorStyle}>{formik.errors.description}</div>
            ) : null}
          </div>
          {/* ------------floor_number-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label
              htmlFor="floor_number"
              className={`form-label  ${styles.labelStyle}`}
            >
              floor_number
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="number"
              placeholder="Enter Your floor_number"
              name="floor_number"
              {...formik.getFieldProps("floor_number")}
            />
             {formik.touched.floor_number && formik.errors.floor_number ? (
              <div className={styles.errorStyle}>{formik.errors.floor_number}</div>
            ) : null}
          </div>
          {/* ------------apartment_number-------------- */}
          <div className="mb-2 col-sm-12 col-md-12 ">
            <label
              htmlFor="apartment_number"
              className={`form-label  ${styles.labelStyle}`}
            >
              apartment_number
            </label>
            <input
              className={`form-control ${styles.inputStyle}`}
              type="number"
              placeholder="Enter Your apartment_number"
              name="apartment_number"
              {...formik.getFieldProps("apartment_number")}
            />
             {formik.touched.apartment_number && formik.errors.apartment_number ? (
              <div className={styles.errorStyle}>{formik.errors.apartment_number}</div>
            ) : null}
          </div>

          {/* ------------Save button -------------- */}
          <ButtonBase type="submit" className={styles.saveButton}>
            <i
              style={{ marginRight: "10%" }}
              className="fa-solid fa-floppy-disk"
            ></i>
            Save
          </ButtonBase>
          {/* ------------back button -------------- */}
          <ButtonBase
            onClick={() => setAddPage(false)}
            className={styles.deleteButton}
          >
            back
          </ButtonBase>
        </form>
      </Box>
    </Container>
  );
};
export default CreateForm;
