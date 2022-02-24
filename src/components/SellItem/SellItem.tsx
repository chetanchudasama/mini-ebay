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
import "./SellItem.css";
import FileUpload from "../FileUpload/FileUpload";
import FileModel from "../../models/FileModel";
import Item from "../../models/Item";
import {
  AddNewPost,
  GetCategories,
  GetCountries,
  GetState,
} from "../../api/PostController";

const SellItem: React.FC = () => {
  const [itemPost, setItemPost] = useState<Item>(new Item());
  const [countriesList, setCountriesList] = useState<any>([]);
  const [categoriesList, setCategoriesList] = useState<any>([]);
  const [stateList, setStateList] = useState<any>([]);

  const onChange = (e: any) => {
    const { value, id } = e.target;
    setItemPost({ ...itemPost, [id]: value });
  };

  const handleSelectChange = (propertyName: string, value: string) => {
    setItemPost({ ...itemPost, [propertyName]: value });
  };

  useEffect(() => {
    GetCountries()
      .then((res: any) => {
        if (res.data.result.data) {
          setCountriesList(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    GetCategories()
      .then((res: any) => {
        if (res.data.result.data) {
          setCategoriesList(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    GetState(itemPost.country)
      .then((res: any) => {
        if (res.data.result.data) {
          setStateList(res.data.result.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemPost.country]);

  const handlePostData = () => {
    const formData = new FormData();
    if (itemPost.image.file) {
      formData.append("images", itemPost.image.file, itemPost.image.fileName);
    }

    Object.entries(itemPost).forEach(([k, v]) => {
      if (k !== "opposingTeamLogo") {
        // skip fields with empty value
        if (v !== "") {
          formData.append(k, v);
        }
      }
    });
    AddNewPost(formData)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFileChange = (file: FileModel) => {
    setItemPost({
      ...itemPost,
      image: file,
    });
  };

  return (
    <>
      <Container maxWidth="md" className="sell-item-container">
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
            <FileUpload
              onFileChange={onFileChange}
              imageFile={itemPost.image}
            />
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
                    <MenuItem key={country._id} value={country.name}>
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
                    <MenuItem key={state.id} value={state.text}>
                      {state.text}
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
                  checked={itemPost.isVisiblePublicly}
                  onChange={(event) =>
                    setItemPost({
                      ...itemPost,
                      isVisiblePublicly: event.target.checked,
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
          <Button variant="contained" size="large" onClick={handlePostData}>
            POST
          </Button>
        </Grid>
      </Container>
    </>
  );
};

export default SellItem;
