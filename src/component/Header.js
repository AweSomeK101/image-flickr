import { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Popper from "@material-ui/core/Popper";

const useStyles = makeStyles((theme) => ({
  paper: {
    // border: "1px solid",
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    maxHeight: "200px",
    minWidth: "250px",
    cursor: "pointer",
  },
}));

function Header({ searchData }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  // calling api for images
  function search(e) {
    e.preventDefault();
    console.log(value);
    var srchArr = JSON.parse(localStorage.getItem("names"));
    if (srchArr) {
      srchArr.push(value);
      localStorage.setItem("names", JSON.stringify(srchArr));
    } else {
      localStorage.setItem("names", JSON.stringify([value]));
    }
    console.log(srchArr);
    setAnchorEl(null);
    searchData(value);
  }

  return (
    <header>
      <div className="container">
        <div className="logo">Image Search</div>
        <form onSubmit={search} autoComplete="off">
          <input
            type="text"
            name="search"
            id="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleClick}
          />
          <button type="submit">
            <SearchIcon />
          </button>
        </form>
      </div>

      {JSON.parse(localStorage.getItem("names")) ? (
          <Popper
            id={id}
            open={open}
            anchorEl={anchorEl}
            placement="bottom-start"
          >
            {JSON.parse(localStorage.getItem("names")).map((item) => (
              <div
                className={classes.paper}
                onClick={() => {
                  setValue(item);
                  setAnchorEl(null);
                }}
              >
                {item}
              </div>
            ))}
          </Popper>
      ) : null}
    </header>
  );
}

export default Header;
