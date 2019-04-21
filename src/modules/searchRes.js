import axios from "axios";
import cheerio from "cheerio";
const state = {
  maoyanproData: "",
  doubanData: "",
  bilibiliData: ""
};
const getters = {
  getDoubanData: state => state.doubanData,
  getMaoyanData: state => state.maoyanproData,
  getBilibiliData: state => state.bilibiliData
};
const actions = {
  async onSearchDouban({ commit }, value) {
    let enteryDouBan = async function(key) {
      // 入口应该是用户查寻信息
      let url = `https://movie.douban.com/j/subject_suggest?q=${encodeURIComponent(
        key
      )}`;
      const ajaxData = await axios.get(url);
      let data = ajaxData.data;
      let patter = new RegExp(`(${key})+(?!\\d)`, "g");
      let movielist = [];
      data.forEach(e => {
        let gotmatch = e.title.match(patter);
        if (gotmatch) {
          movielist.push(e);
        }
      });
      let movieUrl = movielist[0].url;
      let movieCover = movielist[0].img;
      let subtitle = movielist[0].sub_title;
      return {
        movieUrl,
        movieCover,
        subtitle
      };
    };
    let getInfo = async function(url, cover, subtitle) {
      const page = await axios.get(url);
      const $ = cheerio.load(page.data);
      let comments = [];
      $("#hot-comments .comment-item").each((i, e) => {
        let short = $(e)
          .find(".comment .short")
          .text();
        let full = $(e)
          .find(".comment .full")
          .text();
        if (full) {
          comments[i] = { id: i, full };
        } else {
          comments[i] = { id: i, short };
        }
      });
      let title = $("#content h1").text();
      let rating = $("#interest_sectl .rating_self strong").text();
      let rating_people = $(
        "#interest_sectl .rating_self .rating_people span"
      ).text();
      let better_than = $("#interest_sectl .rating_betterthan a").text();
      let reportA = $("#link-report .all").text();
      let reportB = $("#link-report span").text();
      let report;
      reportA == "" ? (report = reportB) : (report = reportA);
      let imdb = $("#info a")
        .eq(-1)
        .attr("href");
      const doubaninfo = {
        title,
        rating,
        rating_people: parseFloat(rating_people),
        better_than,
        report,
        imdb, //imdb的链接
        cover,
        subtitle,
        comments
      };

      console.log("输出豆瓣数据" + doubaninfo);
      return doubaninfo;
    };
    let result = async function(key) {
      const links = await enteryDouBan(key);
      const data = await getInfo(
        links.movieUrl,
        links.movieCover,
        links.subtitle
      );
      return data;
    };
    result(value).then(e => {
      commit("addMaoyanData", e);
    });
  },
  async onSearchMaoyan({ commit }, value) {
    let entryMaoYan = async function(key) {
      let url = `https://piaofang.maoyan.com/search?key=${encodeURIComponent(
        key
      )}`;
      const page = await axios.get(url);
      const $ = cheerio.load(page.data);
      let movielist = [];
      let patter = new RegExp(`(${key})+(?!\\d)`, "g");
      let nodeLength = $("#search-list .indentInner").length;
      console.log("node length: " + nodeLength);
      $("#search-list .indentInner").each((i, e) => {
        let dataUrl = $(e).attr("data-url");
        let title = $(e)
          .find(".title")
          .text();
        let gotmatch = title.match(patter);
        console.log(gotmatch);
        if (gotmatch) {
          title = gotmatch[0];
          movielist.push({ title, dataUrl });
        } else if (nodeLength == 1) {
          movielist.push({ title, dataUrl });
        }
      });
      console.log(movielist);
      return movielist[0];
    };
    let getData = async function(links) {
      const page = await axios.get(`https://piaofang.maoyan.com${links}`);
      const $ = cheerio.load(page.data);
      let coverlink = $(".info-poster img").attr("src");
      let cover = `https:${coverlink.match(/.*\.jpg/)}`;
      let title = $(".info-title .info-title-content").text();
      let category = $(".info-category")
        .text()
        .trim();
      let duration = $(".info-source-duration span").text();
      let release = $(".info-release .score-info").text();
      let rating_num = $(".rating-stars .rating-num").text();
      let detail_score_count = $(".score-detail .detail-score-count").text();
      let detail_wish_count = $(".score-detail .detail-wish-count").text();
      let imdb_num = $(".NAmerican-show .item p")
        .eq(1)
        .text();
      return {
        title,
        cover,
        duration,
        category,
        release,
        rating_num,
        detail_score_count,
        detail_wish_count,
        imdb_num
      };
    };
    let result = async function(value) {
      const links = await entryMaoYan(value);
      const data = await getData(links.dataUrl);
      return await data;
    };
    result(value).then(e => {
      commit("addDoubanData", e);
    });
  },
  async onSearchBiliBili({ commit }, value) {
    const biliSpider = async function(key) {
      const url =
        "https://search.bilibili.com/all?keyword=" +
        encodeURIComponent(key + "影评") +
        "&from_source=banner_search";
      const page = await axios.get(url);
      const $ = await cheerio.load(page.data);
      let content = $(".video-contain li .title");
      let map = [];
      for (let i = 0; i < content.length; i++) {
        let href = content[i].attribs["href"];
        let reg = /\/av(\d*)/; // 正则匹配那去av号码
        let [, avNum] = href.match(reg); // 结构赋值,只给数组中第二个参数
        let iframeUrl = `https://player.bilibili.com/player.html?aid=${avNum}`;
        map.push(iframeUrl);
      }
      return await map;
    };
    biliSpider(value).then(e => commit("addBilibili", e));
  }
};
const mutations = {
  addMaoyanData: (state, data) => (state.maoyanproData = data),
  addDoubanData: (state, data) => (state.doubanData = data),
  addBilibili: (state, data) => (state.bilibiliData = data)
};
export default {
  state,
  getters,
  actions,
  mutations
};
