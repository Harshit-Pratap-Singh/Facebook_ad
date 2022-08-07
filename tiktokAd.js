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
var createCampaign = function (name, objective_type, advertiser_id, acccess_token) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/campaign/create/", {
                        advertiser_id: advertiser_id,
                        campaign_name: name,
                        objective_type: objective_type,
                        budget_mode: "BUDGET_MODE_INFINITE"
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data.data.campaign_id);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.campaign_id
                    }];
            case 2:
                error_1 = _a.sent();
                console.log("ERROR--->", error_1);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createAdGroup = function (name, advertiser_id, acccess_token, campaign_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/adgroup/create/", {
                        advertiser_id: advertiser_id,
                        campaign_id: campaign_id,
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
                        bid_type: "BID_TYPE_NO_BID"
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data.data.adgroup_id);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.adgroup_id
                    }];
            case 2:
                error_2 = _a.sent();
                console.log("ERROR--->", error_2);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var uploadImageViaUrl = function (acccess_token, advertiser_id, image_url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/file/image/ad/upload/", {
                        advertiser_id: advertiser_id,
                        upload_type: "UPLOAD_BY_URL",
                        image_url: image_url
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.image_id
                    }];
            case 2:
                error_3 = _a.sent();
                console.log("ERROR--->", error_3);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var uploadVideoViaUrl = function (acccess_token, advertiser_id, video_url) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/file/video/ad/upload/", {
                        advertiser_id: advertiser_id,
                        upload_type: "UPLOAD_BY_URL",
                        video_url: video_url
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.video_id
                    }];
            case 2:
                error_4 = _a.sent();
                console.log("ERROR--->", error_4);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createAd = function (acccess_token, advertiser_id, image_id, adgroup_id, video_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/ad/create/", {
                        advertiser_id: advertiser_id,
                        upload_type: "UPLOAD_BY_URL",
                        adgroup_id: adgroup_id,
                        creatives: [
                            {
                                ad_text: "VISIT NOW",
                                call_to_action: "LEARN_MORE",
                                video_id: video_id,
                                image_ids: [image_id],
                                landing_page_url: "https://www.markopolo.ai/",
                                ad_format: "SINGLE_VIDEO",
                                display_name: "Markopolo.ai",
                                ad_name: "test 2"
                            },
                        ]
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.ad_ids[0]
                    }];
            case 2:
                error_5 = _a.sent();
                console.log("ERROR--->", error_5);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var previewAd = function (acccess_token, advertiser_id, ad_id) { return __awaiter(void 0, void 0, void 0, function () {
    var response, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1["default"].post("https://sandbox-ads.tiktok.com/open_api/v1.2/creative/ads_preview/create/", {
                        advertiser_id: advertiser_id,
                        material_type: "AD",
                        ad_id: ad_id
                    }, {
                        headers: {
                            "Access-Token": acccess_token
                        }
                    })];
            case 1:
                response = _a.sent();
                if (response.data.code != 0) {
                    console.log("ERROR-->", response.data);
                    return [2 /*return*/, {
                            success: false
                        }];
                }
                console.log(response.data);
                console.log(response.data.data.preview_link);
                return [2 /*return*/, {
                        success: true,
                        data: response.data.data.preview_link
                    }];
            case 2:
                error_6 = _a.sent();
                console.log("ERROR-->", error_6);
                return [2 /*return*/, {
                        success: false
                    }];
            case 3: return [2 /*return*/];
        }
    });
}); };
var test = function () {
    var acccess_token = process.env.TICTOK_ACCESS_TOKEN;
    var advertiser_id = "7126440213424996354", campaign_id = "1739926054224929", adgroup_id = "1739931427225618", image_url = "https://media.4-paws.org/8/e/a/2/8ea2d850a774c6747db95dddfd21bec0e1733c09/VIER%20PFOTEN_2018-12-02_023.jpg", video_url = "https://rr3---sn-ci5gup-a3vz.googlevideo.com/videoplayback?expire=1659628310&ei=tZbrYrbZOsTL0wWzmpAg&ip=45.8.134.210&id=o-AJ3KehAP-pl1ne3fwMgiwlBw4d6dx-AEe9oLTOJQ_TCs&itag=298&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&gir=yes&clen=3018784&dur=49.082&lmt=1643298109409588&keepalive=yes&fexp=24001373,24007246,24239125&beids=24239125&c=ANDROID&rbqsm=fr&txp=5535434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMl3prfZ5_fNaymPUpyTSqu0CqdpQ7BofRVrHQDFeyD2AiBQYwDZeQ3cBs7E-geXJLiZWtSPp9FiIfVDgi-H1F7edw%3D%3D&title=Dogs+That+Fly+-+Malinois+%26+Alsatian+Dogs+Show+Their+Jumping+Agility+++%23Shorts&redirect_counter=1&rm=sn-aigesd7s&req_id=389b1ae6da9ba3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=SL&mip=2401:4900:45ec:aae2:3d8b:3384:1cb6:f5ea&mm=31&mn=sn-ci5gup-a3vz&ms=au&mt=1659606369&mv=u&mvi=3&pl=48&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAIRLWWxGSQxW0LxiMb1IbprX_XY7yxzo6X-pxuzY0pUwAiEAvN3xNmI9HU7iPH85754JvQEJx5cZ6v_PAIKo7Mvo2qg%3D", image_id = "ad-site-i18n-sg/202208045d0d167d05c3c59a408495bc", video_id = "v10033g50000cblpe83c77u8i08fbm30", ad_id = "1740224541701153";
    //   createCampaign("test 4", "REACH", advertiser_id, acccess_token);
    //   createAdGroup("test 2", advertiser_id, acccess_token, campaign_id);
    //   uploadImageViaUrl(acccess_token,advertiser_id,image_url);
    // uploadVideoViaUrl(acccess_token,advertiser_id,video_url);
    //image and video aspect ratio should be same
    // createAd(acccess_token, advertiser_id, image_id, adgroup_id,video_id);
    previewAd(acccess_token, advertiser_id, ad_id);
};
test();
