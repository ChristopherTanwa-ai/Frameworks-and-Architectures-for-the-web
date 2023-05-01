import { Poster } from "./types";

export default function getRandomPosters(postersData: Record<string, Poster>): Record<string, Poster> {
   /**  const posterKeys = Object.keys(postersData);
    const selectedKeys = new Set<string>();
  
    while (selectedKeys.size < 4) {
      const randomIndex = Math.floor(Math.random() * posterKeys.length);
      selectedKeys.add(posterKeys[randomIndex]);
    }
  
    const selectedPosters: Record<string, Poster> = {};
    for (const key of selectedKeys) {
      selectedPosters[key] = postersData[key];
    }
  
    return selectedPosters;
    */
    
    
    const selectedPosters: Record<string, Poster> = {};
    selectedPosters[0] = postersData[0]
    selectedPosters[1] = postersData[1]
    selectedPosters[2] = postersData[2]
    selectedPosters[3] = postersData[3]

    return selectedPosters;
  }
  