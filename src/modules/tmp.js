import axios from 'axios';
import cheerio from 'cheerio';

async function mainpage(url) {
  const page = await axios(url);
  const $ = cheerio.load(page.data);
  const ttid = $('.slate_wrapper .slate a').attr('data-tconst');
  const videoid = $('.slate_wrapper .slate a').attr('data-video');
  console.log('imdb返回查询结果' + ttid + ' ' + videoid);
  return { ttid, videoid };
}
async function page2link(data) {
  let url2 = `https://www.imdb.com/_json/video/${data.ttid}`;
  const page = await axios.get(url2);
  const dataBody = page.data;
  const current = await dataBody.videoMetadata[data.videoid];
  let video = [];
  let p1080 = current.encodings.filter(e => e.definition == '1080p');
  let p720 = current.encodings.filter(e => e.definition == '720p');
  let auto = current.encodings.filter(e => e.definition == 'auto');
  if (p1080 != '') {
    video.push(p1080[0].videoUrl);
  } else if (p720 != '') {
    video.push(p720[0].videoUrl);
  } else {
    video.push(auto[0].videoUrl);
  }
  console.log('imdb预告视频：' + video[0]);
  return video[0];
}
async function imdb(imdbLink) {
  console.log('imdbLink2:' + imdbLink);
  let data = await mainpage(imdbLink);
  let videoURL = await page2link(data);
  return videoURL;
}
