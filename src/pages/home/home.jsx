import * as React from "react";
import { Container, Box, ButtonBase, Alert, CircularProgress } from "@mui/material";
import List from "../../components/List";
import styles from "./home.module.css";
import CreateForm from "../../components/createForm";
import EditForm from "../../components/editForm";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../store/address/addressSlice";
const Home = () => {
  const { allAddresses , isLoading } = useSelector((state) => state.address);

  const [editPage, setEditPage] = React.useState(false);
  const [addPage, setAddPage] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {

    dispatch(getAddress());

  }, []);
  return (
    <>
      <h2 className={styles.title}>YDS-Task</h2>
       
      <Container>
        {!addPage && !editPage && (
          <ButtonBase
            onClick={() => setAddPage(true)}
            type="submit"
            className={styles.addButton}
          >
            <i className={`fa-solid fa-plus ${styles.addIconStyle}`}></i>
            New
          </ButtonBase>
        )}
      </Container>

     {isLoading &&  (<div className={styles.progressContainer}>
              <CircularProgress className={styles.progress} />
            </div>)}

      {allAddresses.length === 0  && !addPage && !isLoading? (
        <Container>
          <Box className={styles.alertContainerStyle} height="400px">
            <Alert
              variant="filled"
              severity="info"
              className={styles.alertStyle}
            >
              You don't have any Addresses
            </Alert>
          </Box>
        </Container>
      ) : (
        <Container className={styles.homeContainer}>
          {!addPage && !editPage  && allAddresses.length !== 0  &&(
            <List setEditPage={setEditPage} setAddPage={setAddPage} />
          )}
          {editPage &&  <EditForm setEditPage={setEditPage} />}
          {addPage && <CreateForm setAddPage={setAddPage} />}
        </Container>
      )}
    </>
  );
};

export default Home;
