import axios from "axios";
import cheerio from "cheerio";
const state = {
  maoyanproData: {
    title: "惊奇队长",
    cover:
      "https://p0.meituan.net/movie/034069fc367db8a7d9644717b416cc2c332883.jpg",
    duration: "124分钟 ",
    category: "动作,冒险,科幻\n                    3DIMAX",
    release: "2019-03-08大陆上映",
    rating_num: "8.7",
    detail_score_count: "31万观众评分 ",
    detail_wish_count: "43.3万人想看 ",
    imdb_num: "7.2"
  },
  doubanData: {
    title: "惊奇队长 Captain Marvel (2019)",
    rating: "7.0",
    rating_people: 268314,
    better_than: "63% 科幻片63% 动作片",
    report:
      "漫画中的初代“惊奇女士”原名Carol Danvers，她曾经是一名美国空军情报局探员，暗恋惊奇先生。此后她得到了超能力，成为“惊奇女士”，在漫画中是非常典型的女性英雄人物。她可以吸收并控制任意形态的能量，拥有众多超能力。《惊奇队长》将是漫威首部以女性超级英雄为主角的电影。",
    imdb: "http://www.imdb.com/title/tt4154664",
    cover:
      "https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2548870813.jpg",
    subtitle: "Captain Marvel",
    comments: [
      {
        id: 0,
        short:
          "你们知道凌晨两点半，看完《惊奇队长》回家在楼道里遇到一只橘猫的感受吗？"
      },
      {
        id: 1,
        full:
          "没想到还有这么多停留在春晚选花魁的审美，也活该养出次方AB和海量烂片。觉得女主有问题的拜托去看印度歌舞片和DC海王好吗？反正我从定妆照开始就觉得很有代入感，超级英雄又不是超级整容，这角色之前就是普通人，反而更凸显超能力带来的变化，marvel精神本就是普通人也可以成长为英雄；如果本来就是个引入注目的精致花瓶发型一丝不苟打一下看着就要坏了对这个角色塑造又有什么意义？文艺片出身的女主更让漫威电影有史诗感！"
      },
      {
        id: 2,
        full:
          "漫威电影正常发挥吧，不用指望有什么惊喜，也算不上很差。这部最大的意义还是必须在四月末的复联决战之前，把惊奇队长这个角色引出来。毕竟，这个战斗力如此强大的女人，在最后大战还是要发挥重要作用的。一点点小幽默，一点点复古感，再加上寇森与年轻版弗瑞这样的老友重逢，看了这么多年复联连续剧的大家，总会有些小触动。不过也仅限于此了。没有任何惊喜的温吞故事与算不上很突出的角色设定。虽然是漫威首部女超级英雄电影，却在其个性和超能力对其影响少，讨论极其有限。裘德洛的角色也接近废角色。当热闹看吧，反正，这部也只是终集的铺垫。另外。她太强了，结尾大战更像是打杂兵。值得关注的还有：定制版斯坦·李纪念片头，结尾必不可少的双彩蛋，以及人人都在夸的萌猫。"
      },
      {
        id: 3,
        full:
          "又是“看彩蛋送电影”，第一个彩蛋比正片好看。\n斯克鲁人怕猫，克里人怕尬舞，养只会尬舞的猫可以称霸宇宙。\n斯坦·李上一次在公交车上看书遇到奇异博士，这次在地铁上看书又遇到惊奇队长。\n所以说啊，年轻人没事不要总是宅在家里，多去公交车、地铁上看看书，搞不好能偶遇超级英雄呢。\n打飞船一幕竟然有种《三体》的水滴的感觉。\n我已经隐隐约约猜到《复联4》的剧情了，噬元兽眼看有个紫薯精竟然敢抢它的宇宙魔方，把他吃了再说！\n毕竟猫才是复联最强的超级英雄。\n想知道如果把咕咕和贝爷关在同一个房间，谁能活下来。"
      },
      {
        id: 4,
        full:
          "妇女节献礼电影。//本片解答了数个起源问题。很高兴又在荧幕见到Stan老爷子（片头也有致敬，鼓了个掌）和李佩斯。女队长戴上面具的莫西干发型我就不吐槽了，满血还是很能打。你以为惊奇队长就是MVP，那你是没养过橘猫。立flag秒拔是好习惯。片尾有一对儿彩蛋，对接复联4。//弱项剧情，毕竟单个英雄起源不如多人互动好看，剧本有点东拼西凑：开头一小会儿像星际迷航，然后像火星救援，之后是谍影重重，接着国家地理之大峡谷，最后居然是星际穿越。//今年几部院线电影评论区都是站队用的么。"
      }
    ]
  },
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
      return await data;
    };
    await commit("addDoubanData", await result(value));
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
      commit("addMaoyanData", e);
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
