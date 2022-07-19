"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
require("dotenv").config();
var axios_1 = require("axios");
var uuid_1 = require("uuid");
var imageToBase64 = require("image-to-base64");
var date = require("date-and-time");
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var refresh_token = process.env.REFRESH_TOKEN;
var developer_token = process.env.DEVELOPER_TOKEN;
var MAPS = {
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
    ZM: 2894
};
//---------------------------generate access token---------------------//
var getAccessToken = function (client_id, client_secret, refresh_token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, data, err_1;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://www.googleapis.com/oauth2/v3/token", null, {
                        params: {
                            client_id: client_id,
                            client_secret: client_secret,
                            refresh_token: refresh_token,
                            grant_type: "refresh_token"
                        }
                    })];
            case 1:
                response = _d.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.access_token);
                data = (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.access_token;
                return [2 /*return*/, {
                        success: true,
                        data: data
                    }];
            case 2:
                err_1 = _d.sent();
                // console.log(err);
                console.log((_c = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _c === void 0 ? void 0 : _c.data);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
// getAccessToken(client_id, client_secret, refresh_token);
var getCampaigns = function () { return __awaiter(void 0, void 0, void 0, function () {
    var access_token, response, err_2;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                return [4 /*yield*/, getAccessToken(client_id, client_secret, refresh_token)];
            case 1:
                access_token = _c.sent();
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/4824749666/googleAds:search", {
                        query: "SELECT campaign.id, campaign.name, campaign.start_date, campaign.end_date, campaign.status FROM campaign ORDER BY campaign.id"
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 2:
                response = _c.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results);
                return [2 /*return*/, {
                        success: true,
                        data: response === null || response === void 0 ? void 0 : response.data
                    }];
            case 3:
                err_2 = _c.sent();
                console.log((_b = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _b === void 0 ? void 0 : _b.data);
                return [2 /*return*/, {
                        success: false
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
// getCampaigns();
//------------------------Create campaign budget---------------------------//
var createCampaignBudget = function (access_token, budget, customer_id, campaign_objective) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_3;
    var _a, _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/campaignBudgets:mutate"), {
                        operations: [
                            {
                                create: {
                                    name: "".concat(campaign_objective, " uuidv4()"),
                                    type: "STANDARD",
                                    amountMicros: budget * 1000000,
                                    deliveryMethod: "STANDARD"
                                }
                            },
                        ]
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 1:
                response = _f.sent();
                console.log((_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results[0]) === null || _b === void 0 ? void 0 : _b.resourceName);
                return [2 /*return*/, {
                        success: true,
                        data: (_d = (_c = response === null || response === void 0 ? void 0 : response.data) === null || _c === void 0 ? void 0 : _c.results[0]) === null || _d === void 0 ? void 0 : _d.resourceName
                    }];
            case 2:
                err_3 = _f.sent();
                console.log((_e = err_3 === null || err_3 === void 0 ? void 0 : err_3.response) === null || _e === void 0 ? void 0 : _e.data);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
//------------------------Create campaign---------------------------//
var createCampaigns = function (access_token, campaign_name, advertising_channel_type, customer_id, campaign_budget, start_date, end_date) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_4;
    var _a, _b, _c, _d, _e, _f, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                _h.trys.push([0, 2, , 3]);
                //
                //converting unix time to acceptable format "YYYY-MM-DD"
                start_date = date.format(new Date(start_date), "YYYY-MM-DD");
                end_date = date.format(new Date(end_date), "YYYY-MM-DD");
                console.log({ start_date: start_date });
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/campaigns:mutate"), {
                        operations: [
                            {
                                create: {
                                    name: campaign_name,
                                    status: "PAUSED",
                                    //type:"STANDARD",
                                    advertisingChannelType: advertising_channel_type,
                                    campaignBudget: campaign_budget,
                                    startDate: start_date,
                                    endDate: end_date,
                                    networkSettings: {
                                        targetGoogleSearch: true,
                                        targetSearchNetwork: true,
                                        targetContentNetwork: true,
                                        targetPartnerSearchNetwork: false
                                    },
                                    manualCpc: {
                                        enhancedCpcEnabled: true
                                    }
                                }
                            },
                        ]
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 1:
                response = _h.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results);
                return [2 /*return*/, {
                        success: true,
                        data: (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.results
                    }];
            case 2:
                err_4 = _h.sent();
                console.log((_c = err_4 === null || err_4 === void 0 ? void 0 : err_4.response) === null || _c === void 0 ? void 0 : _c.data);
                console.log((_g = (_f = (_e = (_d = err_4 === null || err_4 === void 0 ? void 0 : err_4.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.details[0]) === null || _g === void 0 ? void 0 : _g.errors);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
//----------------------campaign location ------------------//
var setCampaignTargetingCriteria = function (access_token, customer_id, campaign_resource_name, location_ids) { return __awaiter(void 0, void 0, void 0, function () {
    var operations_1, response, err_5;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __generator(this, function (_l) {
        switch (_l.label) {
            case 0:
                _l.trys.push([0, 2, , 3]);
                operations_1 = [];
                location_ids.map(function (location_id) {
                    operations_1.push({
                        create: {
                            campaign: campaign_resource_name,
                            location: {
                                geoTargetConstant: "geoTargetConstants/".concat(MAPS[location_id])
                            }
                        }
                    });
                });
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/campaignCriteria:mutate"), {
                        operations: operations_1
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 1:
                response = _l.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results);
                return [2 /*return*/, {
                        success: true,
                        data: (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.results
                    }];
            case 2:
                err_5 = _l.sent();
                console.log((_c = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _c === void 0 ? void 0 : _c.data);
                console.log((_g = (_f = (_e = (_d = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.error) === null || _f === void 0 ? void 0 : _f.details[0]) === null || _g === void 0 ? void 0 : _g.errors);
                console.log((_k = (_j = (_h = err_5 === null || err_5 === void 0 ? void 0 : err_5.response) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.error) === null || _k === void 0 ? void 0 : _k.details);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
//-----------------------------Create ad group------------------------//
var createAdGroup = function (access_token, customer_id, campaign_resource_name, campaign_objective, ad_group_type) { return __awaiter(void 0, void 0, void 0, function () {
    var response, err_6;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/adGroups:mutate"), {
                        operations: [
                            {
                                create: {
                                    name: "".concat(campaign_objective).concat((0, uuid_1.v4)()),
                                    type: ad_group_type,
                                    campaign: campaign_resource_name,
                                    status: "PAUSED",
                                    cpcBidMicros: 10000000
                                }
                            },
                        ]
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 1:
                response = _d.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results);
                return [2 /*return*/, {
                        success: true,
                        data: (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.results
                    }];
            case 2:
                err_6 = _d.sent();
                console.log((_c = err_6 === null || err_6 === void 0 ? void 0 : err_6.response) === null || _c === void 0 ? void 0 : _c.data);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
//----------------------------Add keywords to ad group-------------------------//
// https://googleads.googleapis.com/v11/customers/{customerId}/adGroupCriteria:mutate
var attachKeywordsToAdGroup = function (access_token, customer_id, ad_group_resource_name, keywords) { return __awaiter(void 0, void 0, void 0, function () {
    var operations_2, response, err_7;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 2, , 3]);
                operations_2 = [];
                keywords.map(function (keyword) {
                    operations_2.push({
                        create: {
                            adGroup: ad_group_resource_name,
                            status: "PAUSED",
                            keyword: {
                                matchType: "EXACT",
                                text: keyword
                            }
                        }
                    });
                });
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/adGroupCriteria:mutate"), {
                        operations: operations_2
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 1:
                response = _d.sent();
                console.log((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results);
                return [2 /*return*/, {
                        success: true,
                        data: (_b = response === null || response === void 0 ? void 0 : response.data) === null || _b === void 0 ? void 0 : _b.results
                    }];
            case 2:
                err_7 = _d.sent();
                console.log((_c = err_7 === null || err_7 === void 0 ? void 0 : err_7.response) === null || _c === void 0 ? void 0 : _c.data);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
//---------------------------Upload image assest-------------------//
var uploadImageAssest = function (access_token, customer_id, image_url, image_height, image_width) { return __awaiter(void 0, void 0, void 0, function () {
    var image, response, error_1;
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                _j.trys.push([0, 3, , 4]);
                return [4 /*yield*/, imageToBase64(image_url)];
            case 1:
                image = _j.sent();
                return [4 /*yield*/, axios_1["default"].post("https://googleads.googleapis.com/v11/customers/".concat(customer_id, "/assets:mutate"), {
                        operations: [
                            {
                                create: {
                                    name: (0, uuid_1.v4)(),
                                    type: "IMAGE",
                                    imageAsset: {
                                        mimeType: "IMAGE_JPEG",
                                        fullSize: {
                                            heightPixels: image_height,
                                            widthPixels: image_width,
                                            url: image_url
                                        },
                                        data: image,
                                        fileSize: ((image.length * 3) / 4 - 1).toString
                                    }
                                }
                            },
                        ],
                        responseContentType: "MUTABLE_RESOURCE"
                    }, {
                        headers: {
                            Authorization: "Bearer ".concat(access_token),
                            "developer-token": developer_token
                        }
                    })];
            case 2:
                response = _j.sent();
                console.log((_c = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.results[0]) === null || _b === void 0 ? void 0 : _b.asset) === null || _c === void 0 ? void 0 : _c.id);
                return [2 /*return*/, {
                        success: true,
                        data: (_f = (_e = (_d = response === null || response === void 0 ? void 0 : response.data) === null || _d === void 0 ? void 0 : _d.results[0]) === null || _e === void 0 ? void 0 : _e.asset) === null || _f === void 0 ? void 0 : _f.id
                    }];
            case 3:
                error_1 = _j.sent();
                console.log((_h = (_g = error_1 === null || error_1 === void 0 ? void 0 : error_1.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.error.details[0].errors);
                return [2 /*return*/, {
                        success: false
                    }];
            case 4: return [2 /*return*/];
        }
    });
}); };
/////////////////////////////// testing the functions
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var p, s, access_token, customer_id, budget, campaign, location, adGroup, image_url, image_height, image_width;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = 1658169000000, s = 1658966160000;
                return [4 /*yield*/, getAccessToken(client_id, client_secret, refresh_token)];
            case 1:
                access_token = (_a.sent()).data;
                customer_id = 4824749666, budget = "customers/4824749666/campaignBudgets/11164576942", campaign = "customers/4824749666/campaigns/17791664075", location = "customers/4824749666/campaignCriteria/17791664075~2356", adGroup = "customers/4824749666/adGroups/136374704542", image_url = "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*", image_height = 640, image_width = 635;
                // createCampaigns(access_token.data, "test 12", "SEARCH", customer_id, budget, p, s);
                // createCampaignBudget(access_token, 30, customer_id, "reach");
                // setCampaignLocation(access_token,customer_id,campaign,['UA',"FR"]);
                // createAdGroup(access_token,customer_id,campaign,"Reach","SEARCH_STANDARD");
                // attachKeywordsToAdGroup(access_token,customer_id,adGroup,["books",'free delivery']);
                // let image = await imageToBase64("https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-royalty-free-image-506756303-1560962726.jpg?crop=0.672xw:1.00xh;0.166xw,0&resize=640:*");
                // console.log((image.length)*3/4-2);
                uploadImageAssest(access_token, customer_id, image_url, image_height, image_width);
                return [2 /*return*/];
        }
    });
}); };
test();
