import axios from "axios";

export default function service() {
  const getData = async (url) => {
    try {
      const res = await axios.get(url);
      const loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (params) => {
    const { url, body } = params;
    try {
      const res = await axios.post(url, body);
      const loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (params) => {
    const { url, body } = params;
    try {
      const res = await axios.put(url, body);
      const loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (url) => {
    try {
      const res = await axios.delete(url);
      const loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getData,
    postData,
    updateData,
    deleteData,
  };
}
