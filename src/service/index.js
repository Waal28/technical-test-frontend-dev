import axios from "axios";

export default function service() {
  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      return { data: res.data, success: true };
    } catch (error) {
      console.log(error);
      return { data: error, success: false };
    }
  };

  const postData = async (params) => {
    const { url, body } = params;
    try {
      const res = await axios.post(url, body);
      return { data: res.data, success: true };
    } catch (error) {
      console.log(error);
      return { data: error, success: false };
    }
  };

  const updateData = async (params) => {
    const { url, body } = params;
    try {
      const res = await axios.put(url, body);
      return { data: res.data, success: true };
    } catch (error) {
      console.log(error);
      return { data: error, success: false };
    }
  };

  const deleteData = async (url) => {
    try {
      const res = await axios.delete(url);
      return { data: res.data, success: true };
    } catch (error) {
      console.log(error);
      return { data: error, success: false };
    }
  };

  return {
    getData,
    postData,
    updateData,
    deleteData,
  };
}
