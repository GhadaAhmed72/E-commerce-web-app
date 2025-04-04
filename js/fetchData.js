const data = fetch("assets/data.json").then((response) => response.json());
console.log(data);
export default await data;