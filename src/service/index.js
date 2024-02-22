import axios from "axios";

export default function service() {
  const getData = async (url) => {
    let loading = true;
    try {
      const res = await axios.get(url);
      loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (params) => {
    let loading = true;
    const { url, body } = params;
    try {
      const res = await axios.post(url, body);
      loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (params) => {
    let loading = true;
    const { url, body } = params;
    try {
      const res = await axios.put(url, body);
      loading = false;
      return { data: res.data, loading };
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (url) => {
    let loading = true;
    try {
      const res = await axios.delete(url);
      loading = false;
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
