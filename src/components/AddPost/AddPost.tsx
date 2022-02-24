import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "./AddPost.css";
import FileUpload from "../FileUpload/FileUpload";
import FileModel from "../../models/FileModel";
import PostDetailModel from "../../models/PostDetailModel";
import {
  AddNewPost,
  GetCategories,
  GetCountries,
  GetState,
} from "../../api/PostController";
import CustomSnackbar from "../CustomSnackbar/CustomSnackbar";
import { ICategory, ILocation, IResponseObject } from "../../commons/interface";
import { useHistory } from "react-router-dom";

const SellItem: React.FC = () => {
  const [itemPost, setItemPost] = useState<PostDetailModel>(
    new PostDetailModel()
  );
  const history = useHistory();
  const [countriesList, setCountriesList] = useState<ILocation[]>([]);
  const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
  const [stateList, setStateList] = useState<ILocation[]>([]);
  const [isShownSnackbar, setIsShownSnackbar] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [itemImage, setItemImage] = useState<FileModel>(new FileModel());

  const onChange = (e: any) => {
    const { value, id } = e.target;
    setItemPost({ ...itemPost, [id]: value });
  };

  const handleSelectChange = (propertyName: string, value: string) => {
    setItemPost({ ...itemPost, [propertyName]: value });
  };

  useEffect(() => {
    GetCountries()
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setCountriesList(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    GetCategories()
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setCategoriesList(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (itemPost.country !== undefined) {
      GetState(itemPost.country)
        .then((res: IResponseObject) => {
          if (res.data.result.data) {
            setStateList(res.data.result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [itemPost.country]);

  const handleSubmitPostData = () => {
    const formData = new FormData();
    if (itemImage.file) {
      formData.append("imageUrl", itemImage.file, itemImage.fileName);
    }

    Object.entries(itemPost).forEach(([k, v]) => {
      // skip fields with empty value
      if (v !== "") {
        formData.append(k, v);
      }
    });
    AddNewPost(formData)
      .then((res: IResponseObject) => {
        if (res.data.result.data) {
          setIsShownSnackbar(true);
          setResponseMessage("Record Added successfully");
          history.push("/");
        }
      })
      .catch((error) => {
        setIsShownSnackbar(true);
        setResponseMessage("Something went to wrong");
      });
  };

  return (
    <>
      <Container maxWidth="md" className="item-container">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>INCLUDE SOME DETAILS</h3>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-disabled-label">
                Choose a Category
              </InputLabel>
              <Select
                label="Choose a Category"
                value={itemPost.category}
                onChange={(event: any) => {
                  handleSelectChange("category", event.target.value);
                }}
              >
                {categoriesList.length > 0 &&
                  categoriesList.map((category: any) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.item}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Title</label>
            <TextField
              id="title"
              variant="outlined"
              margin="dense"
              value={itemPost.title}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Description</label>
            <TextField
              id="description"
              multiline
              rows={4}
              fullWidth
              value={itemPost.description}
              onChange={(e) => onChange(e)}
            />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "20px" }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>SET A PRICE</h3>
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Price</label>
            <TextField
              id="price"
              value={itemPost.price}
              variant="outlined"
              margin="dense"
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "20px" }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>UPLOAD PHOTOS OF ITEM </h3>
          </Grid>

          <Grid item xs={8}>
            <FileUpload onFileChange={setItemImage} imageFile={itemImage} />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "20px" }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>YOUR LOCATION</h3>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Country List</InputLabel>
              <Select
                label="Country List"
                value={itemPost.country}
                onChange={(event: any) => {
                  handleSelectChange("country", event.target.value);
                }}
              >
                {countriesList.length > 0 &&
                  countriesList.map((country: any) => (
                    <MenuItem key={country._id} value={country._id}>
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>State</InputLabel>
              <Select
                label="Category"
                value={itemPost.state}
                onChange={(event: any) => {
                  handleSelectChange("state", event.target.value);
                }}
              >
                {stateList.length > 0 &&
                  stateList.map((state: any) => (
                    <MenuItem key={state._id} value={state._id}>
                      {state.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "20px" }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>YOUR PERSONAL DETAIL</h3>
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Your Name</label>
            <TextField
              value={itemPost.name}
              id="name"
              variant="outlined"
              margin="dense"
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Mobile Number</label>
            <TextField
              id="mobileNumber"
              value={itemPost.mobileNumber}
              variant="outlined"
              margin="dense"
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <label className="form-label-text">Email</label>
            <TextField
              id="email"
              variant="outlined"
              margin="dense"
              value={itemPost.email}
              onChange={(e) => onChange(e)}
              fullWidth
            />
          </Grid>

          <Grid item xs={8}>
            <FormControlLabel
              control={
                <Checkbox
                  id="isVisiblePublicly"
                  color="success"
                  checked={itemPost.isPublic}
                  onChange={(event) =>
                    setItemPost({
                      ...itemPost,
                      isPublic: event.target.checked,
                    })
                  }
                />
              }
              label="Is publicly visible post?"
            />
          </Grid>
        </Grid>

        <Divider style={{ marginTop: "20px" }} />

        <Grid item xs={12} className="post-button">
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmitPostData}
          >
            POST
          </Button>
        </Grid>
        {isShownSnackbar && (
          <CustomSnackbar
            message={responseMessage}
            handleClose={setIsShownSnackbar}
          />
        )}
      </Container>
    </>
  );
};

export default SellItem;
