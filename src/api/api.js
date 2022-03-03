import axios from "axios";

const getData = async () => {
  const result = await axios.get(
    "https://run.mocky.io/v3/3e0a039d-af0a-42b1-b45c-254b60f42e43"
  );
  return result
}

export default getData;