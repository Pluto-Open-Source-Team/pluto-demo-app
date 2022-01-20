import authService from "../services/auth.service.js";
import {
    STORAGE,
    API
} from "../config.js";

class GoogleApiService {

    apiInterceptor = async () => {
        const token = localStorage.getItem(STORAGE.ACCESS_TOKEN);

        if (authService.isValidToken()) {
            return `Bearer ${JSON.parse(token).accessToken}`;
        } else {
            let newToken = await authService.getNewAccessToken();
            return `Bearer ${newToken}`;
        }
    };

    retrievesAllOrganizationalUnits = () => new Promise(async (resolve, reject) => {
        const url = `${API.G_ADMIN_HOST}/admin/directory/v1/customer/${API.G_CUSTOMER}/orgunits?type=all&prompt=consent&access_type=offline`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: await this.apiInterceptor()
            }
        })
            .then(async (res) => {
                let parsedData = await res.json();

                if (parsedData && parsedData.organizationUnits) {
                    resolve(parsedData.organizationUnits);
                } else {
                    reject(false);
                }
            })
            .catch((err) => {
                reject(false);
            });
    });
}

const googleApiService = new GoogleApiService();

export default googleApiService;
