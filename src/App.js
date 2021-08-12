import { useState, useEffect } from "react";
import Header from "./component/Header";
import ImageGrid from "./component/ImageGrid";
import Flickr from "flickr-sdk";
import "./App.css";

var flickr = new Flickr("f01d227abc9ee2658e1fb8ff6d19827f");

function App() {
  const [imgArr, setImgArr] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState({
    search: false,
    value: "",
  });

  useEffect(() => {
    getRecentData()
  }, []);

  function getRecentData(){
    flickr.photos
      .getRecent({
        page: page,
        per_page: 50,
      })
      .then((res) => {
        let arr = [];
        console.log(res.body.photos);
        res.body.photos.photo.forEach((data) => {
          let url = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;
          arr.push({ url, title: data.title, id: data.id });
        });
        setImgArr(arr);
        setPage(res.body.photos.page);
        if (res.body.photos.page === res.body.photos.pages) setHasMore(false);
      })
      .catch((err) => console.log(err));
  }

  function fetchData() {
    if (!searchTerm.search) {
      flickr.photos
        .getRecent({
          page: page + 1,
          per_page: 50,
        })
        .then((res) => {
          let arr = imgArr;
          console.log(res.body.photos);
          res.body.photos.photo.forEach((data) => {
            let url = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;
            arr.push({ url, title: data.title, id: data.id });
          });
          setImgArr(arr);
          setPage(res.body.photos.page);
          if (res.body.photos.page === res.body.photos.pages) setHasMore(false);
          console.log("page: ", res.body.photos.page);
        })
        .catch((err) => console.log(err));
    } else {
        flickr.photos
        .search({
          text: searchTerm.value,
          page: page,
          per_page: 50,
        })
        .then((res) => {
          let arr = imgArr;
          console.log(res.body.photos);
          res.body.photos.photo.forEach((data) => {
            let url = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;
            arr.push({ url, title: data.title, id: data.id });
          });
          setImgArr(arr);
          setPage(res.body.photos.page);
          if (res.body.photos.page === res.body.photos.pages) setHasMore(false);
          console.log("page: ", res.body.photos.page);
        })
        .catch((err) => console.log(err));
    }
  }

  function searchData(value) {
    if (value === "") {
      setSearchTerm({ search: false, value });
      getRecentData()
    } else {
      setSearchTerm({ search: true, value });
      flickr.photos
        .search({
          text: value,
          page: page,
          per_page: 50,
        })
        .then((res) => {
          let arr = [];
          console.log(res.body.photos);
          res.body.photos.photo.forEach((data) => {
            let url = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;
            arr.push({ url, title: data.title, id: data.id });
          });
          setImgArr(arr);
          setPage(res.body.photos.page);
          if (res.body.photos.page === res.body.photos.pages) setHasMore(false);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <Header searchData={searchData} />
      <ImageGrid imgArr={imgArr} fetchData={fetchData} hasMore={hasMore} />
    </>
  );
}

export default App;
