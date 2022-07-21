require("dotenv").config();
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import * as imageToBase64 from "image-to-base64";
import * as date from "date-and-time";

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const developer_token = process.env.DEVELOPER_TOKEN;

const MAPS = {
  AF: 2004,
  AL: 2008,
  AQ: 2010,
  DZ: 2012,
  AS: 2016,
  AD: 2020,
  AO: 2024,
  AG: 2028,
  AZ: 2031,
  AR: 2032,
  AU: 2036,
  AT: 2040,
  BS: 2044,
  BH: 2048,
  BD: 2050,
  AM: 2051,
  BB: 2052,
  BE: 2056,
  BT: 2064,
  BO: 2068,
  BA: 2070,
  BW: 2072,
  BR: 2076,
  BZ: 2084,
  SB: 2090,
  BN: 2096,
  BG: 2100,
  MM: 2104,
  BI: 2108,
  BY: 2112,
  KH: 2116,
  CM: 2120,
  CA: 2124,
  CV: 2132,
  CF: 2140,
  LK: 2144,
  TD: 2148,
  CL: 2152,
  CN: 2156,
  CX: 2162,
  CC: 2166,
  CO: 2170,
  KM: 2174,
  CG: 2178,
  CD: 2180,
  CK: 2184,
  CR: 2188,
  HR: 2191,
  CY: 2196,
  CZ: 2203,
  BJ: 2204,
  DK: 2208,
  DM: 2212,
  DO: 2214,
  EC: 2218,
  SV: 2222,
  GQ: 2226,
  ET: 2231,
  ER: 2232,
  EE: 2233,
  GS: 2239,
  FJ: 2242,
  FI: 2246,
  FR: 2250,
  PF: 2258,
  TF: 2260,
  DJ: 2262,
  GA: 2266,
  GE: 2268,
  GM: 2270,
  DE: 2276,
  GH: 2288,
  KI: 2296,
  GR: 2300,
  GD: 2308,
  GU: 2316,
  GT: 2320,
  GN: 2324,
  GY: 2328,
  HT: 2332,
  HM: 2334,
  VA: 2336,
  HN: 2340,
  HU: 2348,
  IS: 2352,
  IN: 2356,
  ID: 2360,
  IQ: 2368,
  IE: 2372,
  IL: 2376,
  IT: 2380,
  CI: 2384,
  JM: 2388,
  JP: 2392,
  KZ: 2398,
  JO: 2400,
  KE: 2404,
  KR: 2410,
  KW: 2414,
  KG: 2417,
  LA: 2418,
  LB: 2422,
  LS: 2426,
  LV: 2428,
  LR: 2430,
  LY: 2434,
  LI: 2438,
  LT: 2440,
  LU: 2442,
  MG: 2450,
  MW: 2454,
  MY: 2458,
  MV: 2462,
  ML: 2466,
  MT: 2470,
  MR: 2478,
  MU: 2480,
  MX: 2484,
  MC: 2492,
  MN: 2496,
  MD: 2498,
  ME: 2499,
  MA: 2504,
  MZ: 2508,
  OM: 2512,
  NR: 2520,
  NP: 2524,
  NL: 2528,
  CW: 2531,
  SX: 2534,
  BQ: 2535,
  NC: 2540,
  VU: 2548,
  NZ: 2554,
  NI: 2558,
  NE: 2562,
  NG: 2566,
  NU: 2570,
  NF: 2574,
  NO: 2578,
  MP: 2580,
  UM: 2581,
  FM: 2583,
  MH: 2584,
  PW: 2585,
  PK: 2586,
  PA: 2591,
  PG: 2598,
  PY: 2600,
  PE: 2604,
  PH: 2608,
  PN: 2612,
  PL: 2616,
  PT: 2620,
  GW: 2624,
  TL: 2626,
  QA: 2634,
  RO: 2642,
  RU: 2643,
  RW: 2646,
  SH: 2654,
  KN: 2659,
  LC: 2662,
  PM: 2666,
  VC: 2670,
  SM: 2674,
  ST: 2678,
  SA: 2682,
  SN: 2686,
  RS: 2688,
  SC: 2690,
  SL: 2694,
  SG: 2702,
  SK: 2703,
  VN: 2704,
  SI: 2705,
  SO: 2706,
  ZA: 2710,
  ZW: 2716,
  ES: 2724,
  SR: 2740,
  SZ: 2748,
  SE: 2752,
  CH: 2756,
  TJ: 2762,
  TH: 2764,
  TG: 2768,
  TK: 2772,
  TO: 2776,
  TT: 2780,
  AE: 2784,
  TN: 2788,
  TR: 2792,
  TM: 2795,
  TV: 2798,
  UG: 2800,
  UA: 2804,
  MK: 2807,
  EG: 2818,
  GB: 2826,
  GG: 2831,
  JE: 2832,
  TZ: 2834,
  US: 2840,
  BF: 2854,
  UY: 2858,
  UZ: 2860,
  VE: 2862,
  WF: 2876,
  WS: 2882,
  YE: 2887,
  ZM: 2894,
};

//---------------------------generate access token---------------------//

const getAccessToken = async (
  client_id: string,
  client_secret: string,
  refresh_token: string
) => {
  try {
    const response = await axios.post(
      "https://www.googleapis.com/oauth2/v3/token",
      null,
      {
        params: {
          client_id,
          client_secret,
          refresh_token,
          grant_type: "refresh_token",
        },
      }
    );
    // console.log(response?.data?.access_token);
    let data = response?.data?.access_token;
    return {
      success: true,
      data,
    };
  } catch (err) {
    // console.log(err);

    console.log(err?.response?.data);
    return {
      success: false,
    };
  }
};

// getAccessToken(client_id, client_secret, refresh_token);

const getCampaigns = async (access_token) => {
  try {
    const response = await axios.post(
      "https://googleads.googleapis.com/v11/customers/4824749666/googleAds:search",
      {
        query:
          "SELECT campaign.id, campaign.name, campaign.start_date, campaign.end_date, campaign.status FROM campaign where campaign.id=17791664075",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data,
    };
  } catch (err) {
    console.log(err?.response?.data);

    return {
      success: false,
    };
  }
};

// getCampaigns();

//------------------------Create campaign budget---------------------------//

const createCampaignBudget = async (
  access_token,
  budget,
  customer_id,
  campaign_objective
) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/campaignBudgets:mutate`,
      {
        operations: [
          {
            create: {
              name: `${campaign_objective} uuidv4()`,
              type: "STANDARD",
              amountMicros: budget * 1000000,
              deliveryMethod: "STANDARD",
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results[0]?.resourceName);
    return {
      success: true,
      data: response?.data?.results[0]?.resourceName,
    };
  } catch (err) {
    console.log(err?.response?.data);
    return {
      success: false,
    };
  }
};

//------------------------Create campaign---------------------------//

const createCampaigns = async (
  access_token,
  campaign_name,
  advertising_channel_type,
  customer_id,
  campaign_budget,
  start_date,
  end_date
) => {
  try {
    //
    //converting unix time to acceptable format "YYYY-MM-DD"
    start_date = date.format(new Date(start_date), "YYYY-MM-DD");
    end_date = date.format(new Date(end_date), "YYYY-MM-DD");
    console.log({ start_date });

    // const campaignsBudget = await createCampaignBudget(access_token,budget,customer_id,campaign_objective);
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/campaigns:mutate`,
      {
        operations: [
          {
            create: {
              name: campaign_name,
              status: "PAUSED",
              //type:"STANDARD",
              advertisingChannelType: advertising_channel_type,
              campaignBudget: campaign_budget, //"customers/4824749666/campaignBudgets/11164576942",
              startDate: start_date,
              endDate: end_date,
              networkSettings: {
                targetGoogleSearch: true,
                targetSearchNetwork: true,
                targetContentNetwork: true,
                targetPartnerSearchNetwork: false,
              },
              manualCpc: {
                enhancedCpcEnabled: true,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results);
    return {
      success: true,
      data: response?.data?.results[0].resourceName,
    };
  } catch (err) {
    console.log(err?.response?.data);
    console.log(err?.response?.data?.error?.details[0]?.errors);

    return {
      success: false,
    };
  }
};

//----------------------campaign location ------------------//

const setCampaignTargetingCriteria = async (
  access_token,
  customer_id,
  campaign_resource_name,
  location_ids
) => {
  try {
    let operations = [];

    location_ids.map((location_id) => {
      operations.push({
        create: {
          campaign: campaign_resource_name,
          location: {
            geoTargetConstant: `geoTargetConstants/${MAPS[location_id]}`,
          },
        },
      });
    });

    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/campaignCriteria:mutate`,
      {
        operations,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results);
    return {
      success: true,
      data: response?.data?.results,
    };
  } catch (err) {
    console.log(err?.response?.data);
    console.log(err?.response?.data?.error?.details[0]?.errors);
    console.log(err?.response?.data?.error?.details);

    return {
      success: false,
    };
  }
};

//-----------------------------Create ad group------------------------//

const createAdGroup = async (
  access_token,
  customer_id,
  campaign_resource_name,
  campaign_objective,
  ad_group_type
) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/adGroups:mutate`,
      {
        operations: [
          {
            create: {
              name: `${campaign_objective}${uuidv4()}`,
              type: ad_group_type,
              campaign: campaign_resource_name,
              status: "PAUSED",
              cpcBidMicros: 10000000,
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results,
    };
  } catch (err) {
    console.log(err?.response?.data);
    return {
      success: false,
    };
  }
};

//----------------------------Add keywords to ad group-------------------------//

// https://googleads.googleapis.com/v11/customers/{customerId}/adGroupCriteria:mutate

const attachKeywordsToAdGroup = async (
  access_token,
  customer_id,
  ad_group_resource_name,
  keywords
) => {
  try {
    let operations = [];
    keywords.map((keyword) => {
      operations.push({
        create: {
          adGroup: ad_group_resource_name,
          status: "PAUSED",
          keyword: {
            matchType: "EXACT",
            text: keyword,
          },
        },
      });
    });
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/adGroupCriteria:mutate`,
      {
        operations,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results,
    };
  } catch (err) {
    console.log(err?.response?.data);

    return {
      success: false,
    };
  }
};

//---------------------------Upload image assest-------------------//

const uploadImageAssest = async (
  access_token,
  customer_id,
  image_url,
  image_height,
  image_width
) => {
  try {
    const image = await imageToBase64(image_url);

    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/assets:mutate`,
      {
        operations: [
          {
            create: {
              name: uuidv4(),
              type: "IMAGE",
              imageAsset: {
                mimeType: "IMAGE_JPEG",
                fullSize: {
                  heightPixels: image_height,
                  widthPixels: image_width,
                  url: image_url,
                },
                data: image,
                fileSize: ((image.length * 3) / 4 - 1).toString,
              },
            },
          },
        ],
        responseContentType: "MUTABLE_RESOURCE",
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results[0].resourceName);

    return {
      success: true,
      data: response?.data?.results[0].resourceName,
    };
  } catch (error) {
    console.log(error?.response?.data?.error.details[0].errors);

    return {
      success: false,
    };
  }
};

//------------------------------create search ad------------------------//

//  https://googleads.googleapis.com/v11/customers/{customerId}/adGroupAds:mutate

const createSearchAd = async (
  access_token,
  customer_id,
  ad_group_resource_name,
  website,
  headlines,
  descriptions
) => {
  try {
    let headline_assets = [];
    headline_assets.push({ text: headlines[0], pinnedField: "HEADLINE_1" });
    for (let i = 1; i < headlines.length; i++) {
      if (headlines[i].length <= 30)
        headline_assets.push({ text: headlines[i] });
    }

    let description_assets = [];
    descriptions.map((description) => {
      description_assets.push({ text: description });
    });

    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/adGroupAds:mutate`,
      {
        operations: [
          {
            create: {
              adGroup: ad_group_resource_name,
              status: "PAUSED",
              ad: {
                finalUrls: [website],
                responsiveSearchAd: {
                  headlines: headline_assets,
                  descriptions: description_assets,
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );
    console.log(response?.data?.results);
    return {
      success: true,
      data: response?.data?.results,
    };
  } catch (error) {
    console.log(error?.response?.data?.error.details[0].errors);
    return {
      success: false,
    };
  }
};

//--------------------------------create display ad-------------------//

const createDisplayAd = async (
  access_token,
  customer_id,
  ad_group_resource_name,
  website,
  headline_text,
  long_headline_text,
  description_text,
  business_name,
  marketing_image_asset_id,
  square_marketing_image_asset_id
) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/adGroupAds:mutate`,
      {
        operations: [
          {
            create: {
              adGroup: ad_group_resource_name,
              status: "PAUSED",
              ad: {
                finalUrls: [website],
                responsiveDisplayAd: {
                  headlines: [{ text: headline_text }],
                  longHeadline: { text: long_headline_text },
                  descriptions: [{ text: description_text }],
                  businessName: business_name,
                  marketingImages: [{ asset: marketing_image_asset_id }],
                  squareMarketingImages: [
                    { asset: square_marketing_image_asset_id },
                  ],
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results,
    };
  } catch (error) {
    console.log(error?.response?.data.error.details[0].errors[0].location);
    console.log(error?.response?.data.error.details[0].errors);
    // console.log(error?.response?.data);

    return {
      success: false,
    };
  }
};

//-----------------------------------attach conversion ids to ad groups-------------//

const createConversionActionForCampaignGoal = async (
  access_token,
  customer_id,
  goal
) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/conversionActions:mutate`,
      {
        operations: [
          {
            create: {
              name: uuidv4(),
              type: "UPLOAD_CLICKS",
              category: goal,
              status: "ENABLED",
              viewThroughLookbackWindowDays: "15",
              valueSettings: {
                defaultValue: 15.0,
                alwaysUseDefaultValue: true,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results[0].resourceName,
    };
  } catch (error) {
    console.log(error?.response?.data.error);
    // console.log(error?.response?.data);

    return {
      success: false,
    };
  }
};

const createConversionUserList = async (
  access_token,
  customer_id,
  conversion_action_ids
) => {
  try {
    let actions = [];
    conversion_action_ids.map((conversion_action_id) => {
      actions.push({ conversionAction: conversion_action_id });
    });

    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/userLists:mutate`,
      {
        operations: [
          {
            create: {
              name: `BasicUserList ${uuidv4()}`,
              description:
                "A list of people who have triggered one or more conversion actions",
              membershipStatus: "OPEN",
              membershipLifeSpan: "365",
              basicUserList: {
                actions,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results[0]?.resourceName,
    };
  } catch (error) {
    console.log(error?.response?.data.error);

    return {
      success: false,
    };
  }
};

const attachUserListToAdGroup = async (
  access_token,
  customer_id,
  ad_group_resource_name,
  user_list_resource_name
) => {
  try {
    const response = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customer_id}/adGroupCriteria:mutate`,
      {
        operations: [
          {
            create: {
              adGroup: ad_group_resource_name,
              status: "ENABLED",
              userList: {
                userList: user_list_resource_name,
              },
            },
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "developer-token": developer_token,
        },
      }
    );

    console.log(response?.data?.results);

    return {
      success: true,
      data: response?.data?.results[0]?.resourceName,
    };
  } catch (error) {
    console.log(error?.response?.data.error.details[0].errors);

    return {
      success: false,
    };
  }
};

//  https://googleads.googleapis.com/v11/customers/{customerId}/adGroupCriteria:mutate

/////////////////////////////// testing the functions

const test = async () => {
  let p = 1659348231000,
    s = 1660125831000;

  // console.log(date.format(new Date(p),"YYYY-MM-DD")  );

  const access_token = (
    await getAccessToken(client_id, client_secret, refresh_token)
  ).data;

  let customer_id = 4824749666,
    budget = "customers/4824749666/campaignBudgets/11164576942",
    campaign = "customers/4824749666/campaigns/17791664075",
    campaign_display = "customers/4824749666/campaigns/17806379899",
    location = "customers/4824749666/campaignCriteria/17791664075~2356",
    adGroup = "customers/4824749666/adGroups/136374704542",
    image_url =
      "https://workmacro.com/wp-content/uploads/2018/02/1.91-by-1-1024x538.png",
    image_height = "538",
    image_width = "1024",
    image_url2 =
      "https://www.everydogsday.net/wp-content/uploads/2017/12/image-dog-square-2.jpg",
    image_height2 = "400",
    image_width2 = "400",
    searchAd = "customers/4824749666/adGroupAds/136374704542~611459746710",
    displayAd = "customers/4824749666/adGroupAds/140566432073~611629798772",
    conversion_id = "customers/4824749666/conversionActions/970997926",
    conv_user_list = "customers/4824749666/userLists/7290872239",
    attach_user_list='customers/4824749666/adGroupCriteria/140566432073~1687847039666';

  // createCampaigns(access_token, "test 12", "DISPLAY", customer_id, budget, p, s);

  // createCampaignBudget(access_token, 30, customer_id, "reach");
  // setCampaignLocation(access_token,customer_id,campaign,['UA',"FR"]);
  // createAdGroup(access_token,customer_id,campaign_display,"Reach","DISPLAY_STANDARD");
  // attachKeywordsToAdGroup(access_token,customer_id,adGroup,["books",'free delivery']);
  // let image = await imageToBase64("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*");
  // console.log((image.length)*3/4-2);
  // let marketing_image=(await uploadImageAssest(access_token,customer_id,image_url,image_height,image_width)).data;
  // let square_image=(await uploadImageAssest(access_token,customer_id,image_url2,image_height2,image_width2)).data;

  // createSearchAd(access_token,customer_id,adGroup,"https://www.abc.com",["heading1","heading2","heading3"],['abc1','asdasd','hello']);
  // createDisplayAd(access_token,customer_id,'customers/4824749666/adGroups/140566432073',"https://www.abc.com","heading",'long heading','description','markopolo',marketing_image,square_image);
  // getCampaigns(access_token);

  // createConversionActionForCampaignGoal(access_token,customer_id,"DEFAULT");
  // createConversionUserList(access_token,customer_id,[conversion_id]);
  // attachUserListToAdGroup(access_token, customer_id, 'customers/4824749666/adGroups/140566432073', conv_user_list);
};

test();
