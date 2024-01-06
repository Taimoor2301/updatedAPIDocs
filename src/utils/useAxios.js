import axios from 'axios';
import { getRefreshToken, isAccessTokenExpired, setAuthUser } from './auth';
import { API_BASE_URL } from './constants';
import Cookies from 'js-cookie';

const useAxios = () => {

    const refreshToken = Cookies.get('refresh_token');

    let axiosInstance;

    try {
        const accessToken = Cookies.get('access_token');

        axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: { Authorization: `Bearer ${accessToken}` },
        });

        axiosInstance.interceptors.request.use(async (req) => {
            if (!isAccessTokenExpired(accessToken)) return req;

            const response = await getRefreshToken(refreshToken);

            setAuthUser(response.access, response.refresh);

            req.headers.Authorization = `Bearer ${response.access}`;
            return req;
        });
    } catch (error) {
        // Handle the case where access token is undefined
        console.error('Access token is undefined:', error);

        // Define an asynchronous function and call it immediately
        (async () => {
            try {
                const newAccessToken = await getRefreshToken(refreshToken);

                // Update cookies and create a new axios instance
                Cookies.set('access_token', newAccessToken.access);
                Cookies.set('refresh_token', newAccessToken.refresh);

                axiosInstance = axios.create({
                    baseURL: API_BASE_URL,
                    headers: { Authorization: `Bearer ${newAccessToken.access}` },
                });

                axiosInstance.interceptors.request.use(async (req) => {
                    if (!isAccessTokenExpired(newAccessToken.access)) return req;

                    const response = await getRefreshToken(refreshToken);

                    setAuthUser(response.access, response.refresh);

                    req.headers.Authorization = `Bearer ${response.access}`;
                    return req;
                });
            } catch (error) {
                // Handle error when getting a new access token
                console.error('Error getting new access token:', error);
            }
        })();
    }

    return axiosInstance;
};

export default useAxios;
