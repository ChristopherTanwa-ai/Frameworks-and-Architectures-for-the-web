import { getData } from "./fetch.js";

// Implement  HTTP request GET method on "/BirdQuiz.json" resource
export async function getQuiz() {
  // call getData here and replace the object in the next return statemnt wuth the correct value 
 return getData("./birdQuiz.json")
}