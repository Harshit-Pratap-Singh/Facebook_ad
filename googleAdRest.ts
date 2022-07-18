require("dotenv").config();
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const date = require("date-and-time");

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const refresh_token = process.env.REFRESH_TOKEN;
const developer_token = process.env.DEVELOPER_TOKEN;


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
    console.log(response?.data?.access_token);
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

const getCampaigns = async () => {
  try {
    const access_token = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
    );

    const response = await axios.post(
      "https://googleads.googleapis.com/v11/customers/4824749666/googleAds:search",
      {
        query:
          "SELECT campaign.id, campaign.name, campaign.start_date, campaign.end_date, campaign.status FROM campaign ORDER BY campaign.id",
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
      data: response?.data?.results,
    };
  } catch (err) {
    console.log(err?.response?.data);
    console.log(err?.response?.data?.error?.details[0]?.errors);

    return {
      success: false,
    };
  }
};



/////////////////////////////// testing the functions


const test = async () => {
  let p = 1658169000000,
    s = 1658966160000;

  // console.log(date.format(new Date(p),"YYYY-MM-DD")  );

  const access_token = (await getAccessToken(
    client_id,
    client_secret,
    refresh_token
  )).data;

  let customer_id = 4824749666,
    budget = "customers/4824749666/campaignBudgets/11164576942",
    campaign = "customers/4824749666/campaigns/17791664075";
  // createCampaigns(access_token.data, "test 12", "SEARCH", customer_id, budget, p, s);

  createCampaignBudget(access_token,30,customer_id,"reach");
};

// test();
