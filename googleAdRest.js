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
var date = require("date-and-time");
var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
var refresh_token = process.env.REFRESH_TOKEN;
var developer_token = process.env.DEVELOPER_TOKEN;
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
var test = function () { return __awaiter(void 0, void 0, void 0, function () {
    var p, s, access_token, customer_id, budget, campaign;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                p = 1658169000000, s = 1658966160000;
                return [4 /*yield*/, getAccessToken(client_id, client_secret, refresh_token)];
            case 1:
                access_token = (_a.sent()).data;
                customer_id = 4824749666, budget = "customers/4824749666/campaignBudgets/11164576942", campaign = "customers/4824749666/campaigns/17791664075";
                // createCampaigns(access_token.data, "test 12", "SEARCH", customer_id, budget, p, s);
                createCampaignBudget(access_token, 30, customer_id, "reach");
                return [2 /*return*/];
        }
    });
}); };
test();
