const axios = require('axios');

class ZimbraAPI {
    constructor() {
        this.baseURL = 'https://dbizs-ub22-1912-101.zimbraeng.com/service/soap';
        this.authToken = null;
    }

    async login(username, password) {
        const payload = {
            Body: {
                AuthRequest: {
                    _jsns: "urn:zimbraAccount",
                    account: {
                        by: "name",
                        _content: username
                    },
                    password: password
                }
            }
        };

        try {
            const response = await axios.post(this.baseURL, payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log("LOGIN RESPONSE:", JSON.stringify(response.data, null, 2));


            this.authToken =
                response.data.Body.AuthResponse.authToken[0]._content;

        } catch (error) {
            console.log("FULL ERROR:");
            console.log(JSON.stringify(error.response?.data, null, 2));
            throw error;
        }
    }
    async sendMail(to, subject, body) {
        const payload = {
            Header: {
                context: {
                    _jsns: "urn:zimbra",
                    authToken: this.authToken
                }
            },
            Body: {
                SendMsgRequest: {
                    _jsns: "urn:zimbraMail",
                    m: {
                        e: [
                            {
                                t: "t",
                                a: to
                            }
                        ],
                        su: subject,
                        mp: [
                            {
                                ct: "text/plain",
                                content: {
                                    _content: body
                                }
                            }
                        ]
                    }
                }
            }
        };

        return await axios.post(this.baseURL, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

module.exports = new ZimbraAPI();