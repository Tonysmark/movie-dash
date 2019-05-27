<template>
  <div id="recommand">
    <h1>Top 推荐</h1>
    <Menu mode="horizontal" active-name="1" @on-select="onSelect">
      <MenuItem name="0">
        <Icon type="md-happy"/>喜剧
      </MenuItem>
      <MenuItem name="1">
        <Icon type="ios-people"/>动作
      </MenuItem>
      <MenuItem name="2">
        <Icon type="md-color-wand"/>科幻
      </MenuItem>
      <MenuItem name="3">
        <Icon type="md-ionitron"/>悬疑
      </MenuItem>
      <MenuItem name="4">
        <Icon type="md-easel"/>犯罪
      </MenuItem>
      <MenuItem name="5">
        <Icon type="md-brush"/>动画
      </MenuItem>
      <MenuItem name="6">
        <Icon type="md-bowtie"/>剧情
      </MenuItem>
      <MenuItem name="7">
        <Icon type="md-boat"/>爱情
      </MenuItem>
    </Menu>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in movieList" :key="index">
          <div class="card">
            <div class="card-image" :class="{isActive:item.id==clicked?true:false}">
              <img :src="item.imgh_url" alt>
            </div>
            <div class="card-content">
              <div class="floating-btn" @click="onMore(item.id)">
                <div class="btn">
                  <Icon type="md-add" class="add" :class="{rotate:item.id==clicked?true:false}"/>
                </div>
              </div>
              <div class="card-title">{{item.title}}</div>
              <div class="informs">
                <table class="table">
                  <tr>
                    <td class="table-title">评分</td>
                    <td class="table-content">
                      <img src="../assets/svgs/star.1.svg" alt>
                      <span>{{item.rating}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="table-title">导演</td>
                    <td class="table-content">
                      <span v-for="dir in item.director" :key="dir.name">{{dir.name}}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="table-title">演员</td>
                    <td class="table-content">
                      <span
                        v-for="actor_name in item.actor"
                        :key="actor_name.name"
                      >{{actor_name.name}}</span>
                    </td>
                  </tr>
                </table>
                <div class="more-info">
                  <div class="title">故事梗概：</div>
                  <p>{{item.intro}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import axios from "axios";
export default {
  data() {
    return {
      clicked: false,
      movieList: [
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec97" },
          title: "飞驰人生",
          imgh_url:
            "http://vorcdn.xiaodutv.com/9fdaf0c72fac5c0209786a755b7cfdc7",
          intro:
            "曾经在赛车界叱咤风云、如今却只能经营炒饭大排档的赛车手张驰（沈腾饰）决定重返车坛挑战年轻一代的天才。然而没钱没车没队友，甚至驾照都得重新考，这场笑料百出不断被打脸的复出之路，还有更多哭笑不得的窘境在等待着这位过气车神……",
          rating: "80",
          date: "2019",
          actor: [
            { name: "沈腾", nameEnc: "%C9%F2%CC%DA" },
            { name: "黄景瑜", nameEnc: "%BB%C6%BE%B0%E8%A4" },
            { name: "尹正", nameEnc: "%D2%FC%D5%FD" }
          ],
          director: [{ name: "韩寒", nameEnc: "%BA%AB%BA%AE" }],
          type: [{ name: "喜剧" }],
          __v: 0
        },
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec98" },
          title: "大人物",
          imgh_url:
            "http://vorcdn.xiaodutv.com/23adf1bf6decef32fef9d4d5eb46b0c3",
          intro:
            "无力维权的修车工遭遇非法强拆后，选择跳楼自杀；随着小刑警孙大圣（王千源饰）调查的深入，发现这场看似简单的民事纠纷背后其实另有隐情；随着嫌疑目标的锁定，赵泰（包贝尔饰）和崔京民（王迅饰）为代表的反派集团被盯上后，公然藐视法律挑衅警察。面对反派集团金钱诱惑、顶头上司的警告劝阻、家人性命遭受威胁，这场力量悬殊的正邪较量将会如何收场……",
          rating: "73",
          date: "2019",
          actor: [
            { name: "王千源", nameEnc: "%CD%F5%C7%A7%D4%B4" },
            { name: "包贝尔", nameEnc: "%B0%FC%B1%B4%B6%FB" },
            { name: "王迅", nameEnc: "%CD%F5%D1%B8" }
          ],
          director: [{ name: "五百", nameEnc: "%CE%E5%B0%D9" }],
          type: [{ name: "动作" }, { name: "剧情" }],
          __v: 0
        },
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec99" },
          title: "流浪地球",
          imgh_url:
            "http://vorcdn.xiaodutv.com/98b1c9324ae853c263798a48be2dd0a6",
          intro:
            "太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新家园。然而宇宙之路危机四伏，为了拯救地球，为了人类能在漫长的2500年后抵达新的家园，流浪地球时代的年轻人挺身而出，展开争分夺秒的生死之战。",
          rating: "86",
          date: "2019",
          actor: [
            { name: "李光洁", nameEnc: "%C0%EE%B9%E2%BD%E0" },
            { name: "屈楚萧", nameEnc: "%C7%FC%B3%FE%CF%F4" },
            { name: "吴京", nameEnc: "%CE%E2%BE%A9" }
          ],
          director: [{ name: "郭帆", nameEnc: "%B9%F9%B7%AB" }],
          type: [{ name: "科幻" }],
          __v: 0
        },
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec9a" },
          title: "比悲伤更悲伤的故事",
          imgh_url:
            "http://vorcdn.xiaodutv.com/63d29988c99d8941aac9d348b5ac852e",
          intro:
            "唱片制作人张哲凯（刘以豪）和王牌作词人宋媛媛（陈意涵）相依为命，两人自幼身世坎坷只有彼此为伴，他们是亲人、是朋友，也彷佛是命中注定的另一半。父亲罹患遗传重症而被母亲抛弃的哲凯，深怕自己随时会发病不久人世，始终没有跨出友谊的界线对媛媛展露爱意。眼见哲凯的病情加重，他暗自决定用剩余的生命完成他们之间的终曲，再为媛媛找个可以托付一生的好男人。这时，事业有 成温柔体贴的医生（张书豪）适时的出现让他成为照顾媛媛的最佳人选，二人按部就班发展着关系。一切看似都在哲凯的计划下进行。然而，故事远比这里所写更要悲伤。。。。。。",
          rating: "65",
          date: "2019",
          actor: [
            { name: "陈意涵", nameEnc: "%B3%C2%D2%E2%BA%AD" },
            { name: "刘以豪", nameEnc: "%C1%F5%D2%D4%BA%C0" },
            { name: "张书豪", nameEnc: "%D5%C5%CA%E9%BA%C0" }
          ],
          director: [{ name: "林孝谦", nameEnc: "%C1%D6%D0%A2%C7%AB" }],
          type: [{ name: "爱情" }],
          __v: 0
        },
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec9b" },
          title: "战狼2",
          imgh_url:
            "http://vorcdn.xiaodutv.com/57a348fcea02df074a5a278921d84233",
          intro:
            "《战狼2》的故事讲述了正经历人生最低谷的冷锋，原想在海上漂泊了此一生，却卷入了一场非洲国家的叛乱。本可以安全撤离的他，无法忘记军人的使命，绝不丢下身陷囹圄的同胞和难民们，便只身犯险冲回沦陷区，带领所有被困民众向邻国大逃亡。正如吴京本人所说，他依旧想在续集里延续《战狼》第一部的情怀：犯我中华者虽远必诛。他表示，续集会比第一部更加复杂，场面会更大。制片人之一吕建明也明确表示过，《战狼2》会继续获得军方支持。",
          rating: "80",
          date: "2017",
          actor: [
            { name: "吴京", nameEnc: "%CE%E2%BE%A9" },
            {
              name: "弗兰克·格里罗",
              nameEnc: "%B8%A5%C0%BC%BF%CB%A1%A4%B8%F1%C0%EF%C2%DE"
            },
            { name: "卢靖姗", nameEnc: "%C2%AC%BE%B8%E6%A9" }
          ],
          director: [{ name: "吴京", nameEnc: "%CE%E2%BE%A9" }],
          type: [{ name: "动作" }, { name: "战争" }],
          __v: 0
        },
        {
          _id: { $oid: "5cc0818f97bbf13e3c58ec9c" },
          title: "熊出没(变形记)",
          imgh_url:
            "http://vorcdn.xiaodutv.com/a8f390ad2c77ad13e6b23438f631758d",
          intro:
            "光头强爸爸突然到访狗熊岭，向来严厉古板的强爸却对光头强嘘寒问暖，而朝夕相处却未能缓和关系，反而导致了父子矛盾的爆发……在一次激烈的争吵中，光头强和两熊被“缩小机”意外缩小，毫不知情的强爸伤心离开，并无意间带走了“缩小机”。于是，光头强和两熊踏上了追赶强爸和机器的“微观世界”冒险之旅。与此同时，一名陌生国外女记者突然出现，并频频出没于大马哈鱼生活的河域附近，举止神秘，牵出了一系列神秘事件……",
          rating: "73",
          date: "2018",
          actor: [
            { name: "张伟", nameEnc: "%D5%C5%CE%B0" },
            { name: "张秉君", nameEnc: "%D5%C5%B1%FC%BE%FD" },
            { name: "谭笑", nameEnc: "%CC%B7%D0%A6" }
          ],
          director: [
            { name: "丁亮", nameEnc: "%B6%A1%C1%C1" },
            { name: "林汇达", nameEnc: "%C1%D6%BB%E3%B4%EF" }
          ],
          type: [{ name: "冒险" }, { name: "动画" }],
          __v: 0
        }
      ]
    };
  },
  mounted() {
    new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 200,
        modifier: 1,
        slideShadows: true
      },
      pagination: {
        el: ".swiper-pagination"
      }
    });
  },
  methods: {
    onMore(arg) {
      if (this.clicked == arg) {
        this.clicked = 0;
      } else {
        this.clicked = arg;
      }
    },
    async onSelect(arg) {
      let tagList = [
        "喜剧",
        "动作",
        "科幻",
        "悬疑",
        "犯罪",
        "动画",
        "剧情",
        "爱情"
      ];
      let tagName = tagList[arg];
      console.log(tagName);
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/recommand",
        data: { tagName }
      }).catch(e => console.log(e));
      this.movieList = response.data;
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/style/colors.less");
#recommand {
  min-height: 100vh;
  .ivu-menu-light {
    background-color: @bg-color;
  }
  .swiper-container {
    width: 100%;
    padding-top: 7rem;
  }
  .swiper-slide {
    width: 364px;
    height: 614px;
    .card {
      height: 614px;
      width: 364px;
      background-color: #fff;
      border-radius: 2px;
      overflow: hidden;
    }
    .isActive {
      // 作用下面元素
      height: 70px !important;
    }
    .card-image {
      transition: ease-in-out 0.2s;
      height: 412px;
      overflow: hidden;
    }
    .card-image img {
      margin-top: -30px;
      width: 100%;
    }
    .card-content {
      transition: ease-in-out 0.2s;
      background-color: #fff;
      padding: 24px;
      font-size: 24px;
      font-weight: lighter;
      position: relative;
    }
    .floating-btn {
      position: absolute;
      top: -28px;
      right: 20px;
    }
    .floating-btn .btn {
      cursor: pointer;
      transition: ease-in-out 0.2s;
      background: #2d8cf0;
      border-radius: 50px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    }
    // 作用在下面元素
    .rotate {
      transform: rotate(44deg);
    }
    .floating-btn .btn .add {
      transition: ease-in-out 0.2s;
      padding: 17px;
      color: #fff;
    }
    .card-title {
      margin-bottom: 20px;
    }
    .table {
      font-size: 16px;
    }
    .table tr {
      line-height: 2;
    }
    .table-content img {
      width: 22px;
      padding-right: 8px;
    }
    .table-content span {
      padding-right: 10px;
    }
    .table-title {
      padding-right: 20px;
      min-width: 52px;
    }
    .floating-btn .btn:hover {
      transform: scale(1.1);
    }
    .more-info {
      margin-top: 20px;
    }
    .more-info p {
      margin: 15px 0;
      font-size: 15px;
    }
  }
}
</style>
