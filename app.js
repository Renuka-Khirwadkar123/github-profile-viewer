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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var _a;
function handleSearch() {
    return __awaiter(this, void 0, void 0, function () {
        var input, profile, username, res, user, reposHtml, r, repos, _a, _b;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    input = document.getElementById("username");
                    profile = document.getElementById("profile");
                    username = input.value;
                    if (!username) {
                        profile.innerHTML = "<div class=\"profile-card\">Enter username</div>";
                        return [2 /*return*/];
                    }
                    profile.innerHTML = "<div class=\"profile-card\">Loading...</div>";
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, axios.get("https://api.github.com/users/".concat(username))];
                case 2:
                    res = _e.sent();
                    user = res.data;
                    reposHtml = "";
                    _e.label = 3;
                case 3:
                    _e.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, axios.get("https://api.github.com/users/".concat(username, "/repos?sort=updated&per_page=8"))];
                case 4:
                    r = _e.sent();
                    repos = r.data;
                    if (repos && repos.length) {
                        reposHtml = "\n          <div class=\"repo-list\">\n            <h4>Top Repositories</h4>\n            <ul>\n              ".concat(repos
                            .map(function (repo) {
                            return "<li><a href=\"".concat(repo.html_url, "\" target=\"_blank\" rel=\"noopener noreferrer\">").concat(repo.name, "</a> <span class=\"muted\">\u2022 ").concat(repo.stargazers_count, "</span>").concat(repo.description
                                ? "<div class=\"repo-desc\">".concat(repo.description, "</div>")
                                : "", "</li>");
                        })
                            .join(""), "\n            </ul>\n          </div>\n        ");
                    }
                    return [3 /*break*/, 6];
                case 5:
                    _a = _e.sent();
                    reposHtml = "";
                    return [3 /*break*/, 6];
                case 6:
                    profile.innerHTML = "\n      <div class=\"profile-card\">\n        <img src=\"".concat(user.avatar_url, "\" alt=\"").concat(user.login, " avatar\" />\n        <h3>").concat((_c = user.name) !== null && _c !== void 0 ? _c : user.login, "</h3>\n        <p class=\"muted\">@").concat(user.login, "</p>\n        ").concat(user.bio ? "<p class=\"bio\">".concat(user.bio, "</p>") : "", "\n        <p>Followers: ").concat(user.followers, " \u00B7 Repos: ").concat(user.public_repos, "</p>\n        ").concat(reposHtml, "\n        <p class=\"muted small\">").concat(user.company ? "".concat(user.company, " \u00B7 ") : "").concat((_d = user.location) !== null && _d !== void 0 ? _d : "").concat(user.blog ? " \u00B7 <a href='".concat(user.blog, "' target='_blank' rel='noopener noreferrer'>").concat(user.blog, "</a>") : "", "</p>\n      </div>\n    ");
                    return [3 /*break*/, 8];
                case 7:
                    _b = _e.sent();
                    profile.innerHTML = "<div class=\"profile-card\">User not found</div>";
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
(_a = document
    .getElementById("searchBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", handleSearch);
