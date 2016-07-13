var app = {};
app.status = (function () {
    var server = {
        db: {
            "USER:anish": {
                lastLogin: "",
                count: 0    
            }

        },
        update: function (data) {
            if (!data) {
                throw new Error("server cannot handle, no data provided");
            }

            this.db[data.key].lastLogin = data.lastLogin;
            this.db[data.key].count = data.count;
        },
        get: function (userKey) {
            return this.db[userKey];
        }
    };

    function getUsername () {
        return "USER:anish";
    }

    function getYesterday() {
        var date = new Date();
        date.setDate(date.getDate()-1);
        return {
            year: date.getFullYear(),
            month: date.getMonth()+1,
            day: date.getDate()
        };
    }

    function getLastLogin (ms) {
        var date = new Date(ms);
        return {
            year: date.getFullYear(),
            month: date.getMonth() +1,
            day: date.getDate()
        };
    }

    function hasLoggedInYesterday(lastLoginMs) {
        var yesterday = getYesterday();
        var lastLogin = getLastLogin(lastLoginMs);
        return yesterday.day === lastLogin.day;
    }

    function init() {
        var loggedIn = true;

        if (loggedIn) {
            var count;
            var userKey = getUsername();
            //makes api call to get the login info
            var userInfo = server.get(userKey);
            count = userInfo.lastLogin ? userInfo.count : 0;

            console.log("last login date " + userInfo.lastLogin);
            var regularLogin = hasLoggedInYesterday(userInfo.lastLogin || Date.now());

            if (regularLogin) {
                count += 1;
            } else {
                count = 0;
            }

            server.update({
                key: userKey,
                lastLogin: Date.now(),
                count: count
            });

        } 
    }


    return {
        init : init,
        server: server
    }

}());
