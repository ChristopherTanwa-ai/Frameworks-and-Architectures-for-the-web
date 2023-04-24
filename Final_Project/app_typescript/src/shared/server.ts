import express, { Application, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mainDataJson from './data.json';

interface Poster {
  id: string;
  artist: string;
  description: string;
  img: string;
  price: number;
}

interface MainData {
  Posters: Record<string, Poster>;
}

const app: Application = express();
const mainData: MainData = mainDataJson;
const __dirname = fileURLToPath(new URL('.', import.meta.url));

app.use(express.json());
// app.use(customerRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => console.log('Example app listening on port 3000!'));

function randomPosters(artist?: Poster): Poster[] {
  const posters = mainData.Posters;
  const posterKeys = Object.keys(posters);
  const selectedPosters: Poster[] = [];
  let i = 0;

  while (i < 4) {
    const randomIndex = Math.floor(Math.random() * posterKeys.length);
    const posterKey = posterKeys[randomIndex];
    const poster = posters[posterKey];
    if (poster !== artist && !selectedPosters.some(p => p.id === posterKey)) {
      selectedPosters.push({ ...poster, id: posterKey });
      i++;
    }
  }
  return selectedPosters;
}

function getDetail(poster: string, info: string): string {
  const infoLower = info.toLowerCase();
  switch (infoLower) {
    case 'price':
      return `Price of ${poster} is: ${mainData.Posters[poster].price} kr`;
    case 'artist':
      return JSON.stringify(mainData.Posters[poster].artist);
    case 'description':
      return JSON.stringify(mainData.Posters[poster].description);
    case 'img':
      return mainData.Posters[poster].img;
    default:
      return 'Fail';
  }
}

app.get('/Data', (req: Request, res: Response) => {
  res.send(mainData);
});

app.get('/Data/:Poster', (req: Request, res: Response) => {
  const poster = req.params.Poster;
  res.send(mainData.Posters[poster]);
});

app.get('/Data/:Poster/:info', (req: Request, res: Response) => {
  const poster = req.params.Poster;
  const info = req.params.info;
  const detail = getDetail(poster, info);
  res.send(detail);
});
