import React from "react";
import SingleContent from "./SingleContent";

const Info = () => {
  return (
    <div className="Info mt-5">
      <SingleContent
        title="Important note"
        para1="Please do not refresh page while converting videos, it stops convertion.  Also the maximum input size is 2GB"
      />

      <SingleContent
        title="Performance"
        para1="videoder works really well while compressing smaller videos(less then 300mb), but if you compress videos more then 300mb it will take longer time and it may effect CPU.This can be applicable to other options also."
        para2="Performance and speed is heavily depends on your system."
      />

      <SingleContent
        title="Browser support"
        para1="All modern supports videoder but most of the android browser does not support."
        para2="Click here to check you browser compactablity ,"
        link="https://caniuse.com/?search=wasm"
      />
    </div>
  );
};

export default Info;
