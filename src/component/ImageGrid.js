import { useState, useEffect } from "react";
import Flickr from "flickr-sdk";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    maxHeight: "90vh",
  },
}));

var flickr = new Flickr("f01d227abc9ee2658e1fb8ff6d19827f");

function ImageGrid({imgArr, fetchData, hasMore}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [indexImg, setIndexImg] = useState(0)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };  

  return (
    <main>
      <div className="container">
          {imgArr?
        <InfiniteScroll
        dataLength={imgArr.length}
        next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <ul className="imageGrid">
            {imgArr.map((img, index) => (
              <li key={img.id} onClick={()=>{
                  setIndexImg(index);
                  handleOpen();
              }}>
                <img src={img.url} alt={img.title} loading="lazy" />
              </li>
            ))}

            <li></li>
          </ul>
        </InfiniteScroll>
      : null}
      </div>

{/* image modal */}

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        >
        <Fade in={open}>
          <div className={classes.paper}>
             { imgArr && imgArr.length > 0 ? <img src={imgArr[indexImg].url} alt={imgArr[indexImg].title} /> : null}
          </div>
        </Fade>
      </Modal>
    </main>
    );
}

export default ImageGrid;
