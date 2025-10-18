import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://kalamajhi-high-school-backend.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;