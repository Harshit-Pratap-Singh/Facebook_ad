require("dotenv").config();
import axios from "axios";

const createCampaign = async (
  name,
  objective_type,
  advertiser_id,
  acccess_token
) => {
  try {
    const response = await axios.post(
      "https://sandbox-ads.tiktok.com/open_api/v1.2/campaign/create/",
      {
        advertiser_id,
        campaign_name: name,
        objective_type,
        budget_mode: "BUDGET_MODE_INFINITE",
      },
      {
        headers: {
          "Access-Token": acccess_token,
        },
      }
    );

    if (response.data.code != 0) {
      console.log("ERROR-->", response.data);
      return {
        success: false,
      };
    }
    console.log(response.data.data.campaign_id);
    return {
      success: true,
      data: response.data.data.campaign_id,
    };
  } catch (error) {
    console.log("ERROR--->", error);
    return {
      success: false,
    };
  }
};

const createAdGroup = async (
  name,
  advertiser_id,
  acccess_token,
  campaign_id
) => {
  try {
    const response = await axios.post(
      "https://sandbox-ads.tiktok.com/open_api/v1.2/adgroup/create/",
      {
        advertiser_id,
        campaign_id,
        adgroup_name: name,
        placement_type: "PLACEMENT_TYPE_NORMAL",
        placement: ["PLACEMENT_TIKTOK"],
        location: [6252001],
        external_type: "WEBSITE",
        budget_mode: "BUDGET_MODE_DAY",
        budget: 100,
        schedule_type: "SCHEDULE_START_END",
        schedule_start_time: "2022-09-01 00:00:00",
        schedule_end_time: "2022-09-30 00:00:00",
        optimize_goal: "REACH",
        pacing: "PACING_MODE_SMOOTH",
        billing_event: "CPM",
        frequency: 3,
        frequency_schedule: 1,
        bid_type: "BID_TYPE_NO_BID",
      },
      {
        headers: {
          "Access-Token": acccess_token,
        },
      }
    );

    if (response.data.code != 0) {
      console.log("ERROR-->", response.data);
      return {
        success: false,
      };
    }
    console.log(response.data.data.adgroup_id);
    return {
      success: true,
      data: response.data.data.adgroup_id,
    };
  } catch (error) {
    console.log("ERROR--->", error);
    return {
      success: false,
    };
  }
};

const uploadImageViaUrl = async (acccess_token, advertiser_id, image_url) => {
  try {
    const response = await axios.post(
      "https://sandbox-ads.tiktok.com/open_api/v1.2/file/image/ad/upload/",
      {
        advertiser_id,
        upload_type: "UPLOAD_BY_URL",
        image_url,
      },
      {
        headers: {
          "Access-Token": acccess_token,
        },
      }
    );

    if (response.data.code != 0) {
      console.log("ERROR-->", response.data);
      return {
        success: false,
      };
    }
    console.log(response.data);
    return {
      success: true,
      data: response.data.data.image_id,
    };
  } catch (error) {
    console.log("ERROR--->", error);
    return {
      success: false,
    };
  }
};

const uploadVideoViaUrl = async (acccess_token, advertiser_id, video_url) => {
    try {
      const response = await axios.post(
        "https://sandbox-ads.tiktok.com/open_api/v1.2/file/video/ad/upload/",
        {
          advertiser_id,
          upload_type: "UPLOAD_BY_URL",
          video_url,
        },
        {
          headers: {
            "Access-Token": acccess_token,
          },
        }
      );
  
      if (response.data.code != 0) {
        console.log("ERROR-->", response.data);
        return {
          success: false,
        };
      }
      console.log(response.data);
      return {
        success: true,
        data: response.data.data.video_id,
      };
    } catch (error) {
      console.log("ERROR--->", error);
      return {
        success: false,
      };
    }
  };

const createAd = async (acccess_token, advertiser_id, image_id, adgroup_id,video_id) => {
  try {
    const response = await axios.post(
      "https://sandbox-ads.tiktok.com/open_api/v1.2/ad/create/",
      {
        advertiser_id,
        upload_type: "UPLOAD_BY_URL",
        adgroup_id,

        creatives: [
          {
            ad_text: "VISIT NOW",
            call_to_action: "LEARN_MORE",
            video_id,
            image_ids: [image_id],
            landing_page_url: "https://www.markopolo.ai/",
            ad_format: "SINGLE_VIDEO",
            display_name: "Markopolo.ai",
            ad_name: "test 2",
          },
        ],
      },
      {
        headers: {
          "Access-Token": acccess_token,
        },
      }
    );

    if (response.data.code != 0) {
      console.log("ERROR-->", response.data);
      return {
        success: false,
      };
    }
    console.log(response.data);
    return {
      success: true,
      data: response.data.data.ad_ids[0],
    };
  } catch (error) {
    console.log("ERROR--->", error);
    return {
      success: false,
    };
  }
};

const test = () => {
  const acccess_token = process.env.TICTOK_ACCESS_TOKEN;
  const advertiser_id = "7126440213424996354",
    campaign_id = "1739926054224929",
    adgroup_id = "1739931427225618",
    image_url = "https://media.4-paws.org/8/e/a/2/8ea2d850a774c6747db95dddfd21bec0e1733c09/VIER%20PFOTEN_2018-12-02_023.jpg",
    video_url="https://rr3---sn-ci5gup-a3vz.googlevideo.com/videoplayback?expire=1659628310&ei=tZbrYrbZOsTL0wWzmpAg&ip=45.8.134.210&id=o-AJ3KehAP-pl1ne3fwMgiwlBw4d6dx-AEe9oLTOJQ_TCs&itag=298&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=3018784&dur=49.082&lmt=1643298109409588&keepalive=yes&fexp=24001373,24007246,24239125&beids=24239125&c=ANDROID&rbqsm=fr&txp=5535434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMl3prfZ5_fNaymPUpyTSqu0CqdpQ7BofRVrHQDFeyD2AiBQYwDZeQ3cBs7E-geXJLiZWtSPp9FiIfVDgi-H1F7edw%3D%3D&title=Dogs+That+Fly+-+Malinois+%26+Alsatian+Dogs+Show+Their+Jumping+Agility+++%23Shorts&redirect_counter=1&rm=sn-aigesd7s&req_id=389b1ae6da9ba3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=SL&mip=2401:4900:45ec:aae2:3d8b:3384:1cb6:f5ea&mm=31&mn=sn-ci5gup-a3vz&ms=au&mt=1659606369&mv=u&mvi=3&pl=48&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAIRLWWxGSQxW0LxiMb1IbprX_XY7yxzo6X-pxuzY0pUwAiEAvN3xNmI9HU7iPH85754JvQEJx5cZ6v_PAIKo7Mvo2qg%3D",
  image_id = "ad-site-i18n-sg/202208045d0d167d05c3c59a408495bc",
  video_id="v10033g50000cblpe83c77u8i08fbm30",
  ad_id="1740224541701153";

  //   createCampaign("test 4", "REACH", advertiser_id, acccess_token);
  //   createAdGroup("test 2", advertiser_id, acccess_token, campaign_id);
  
//   uploadImageViaUrl(acccess_token,advertiser_id,image_url); 
    // uploadVideoViaUrl(acccess_token,advertiser_id,video_url);

    //image and video aspect ratio should be same 

  createAd(acccess_token, advertiser_id, image_id, adgroup_id,video_id);
};
test();
