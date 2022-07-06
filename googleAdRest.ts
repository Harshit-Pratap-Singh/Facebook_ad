require("dotenv").config();
import axios from "axios";

const client_id =process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET
const refresh_token =process.env.REFRESH_TOKEN
const developer_token =process.env.DEVELOPER_TOKEN

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

    return response?.data?.access_token;
  } catch (err) {
    // console.log(err);

    console.log(err?.response?.data);
    return "";
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

    return response?.data;
  } catch (err) {
    console.log(err?.response?.data);
    return {};
  }
};

getCampaigns();

const createCampaignBudget = async (access_token: string,name:string,amountMicros?:string,type?:string) => {
  try {
    const response = await axios.post(
      "https://googleads.googleapis.com/v11/customers/4824749666/campaignBudgets:mutate",
      {
        operations: [
          {
            create: {
              name: `${name} Budget`,
              type: type || "STANDARD",
              amountMicros: amountMicros || "20000",
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
    return response?.data?.results[0]?.resourceName;
  } catch (err) {
    console.log(err?.response?.data);
    return "";
  }
};

const createCampaigns = async (name:string,type?:string,status?:string) => {
  try {
    const access_token = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
    );

    const campaignsBudget = await createCampaignBudget(access_token,name);
    const response = await axios.post(
      "https://googleads.googleapis.com/v11/customers/4824749666/campaigns:mutate",
      {
        operations: [
          {
            create: {
              name,
              status: status || "PAUSED",
              advertisingChannelType: type || "SEARCH",
              campaignBudget: `${campaignsBudget}`, //"customers/4824749666/campaignBudgets/11164576942",
              networkSettings: {
                targetGoogleSearch: true,
                targetSearchNetwork: true,
                targetContentNetwork: true,
                targetPartnerSearchNetwork: false,
              },
              target_spend: {},
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
    return response?.data?.results;
  } catch (err) {
    console.log(err?.response?.data);
    return [];
  }
};

// createCampaigns("test 1");