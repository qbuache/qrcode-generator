import dayjs from "dayjs";

export default (name, extension, data) => {
  const filename = `${name}_` + dayjs().format("YYYY-MM-DD_HH-mm-ss");
  let link = document.createElement("a");
  link.download = `${filename}.${extension}`;
  link.href = data;
  link.click();
};
