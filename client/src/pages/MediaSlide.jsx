import { useEffect, useState } from "react";
import mediaApi from "../api/modules/media.api";
import AutoSwiper from "../components/common/AutoSwiper";
import { SwiperSlide } from "swiper/react";


const MediaSlide = ({ mediaType, mediaCategory }) => {
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        const getMedias = async () => {
            const { response, err } = await mediaApi.getList({ mediaType, mediaCategory, page: 1 });
            if (response) setMedias(response.results);
            if (err) toast.error(err.message);
        }
        getMedias();
    }, [mediaType, mediaCategory]);

    return (
        <AutoSwiper>
            {medias.map((medias, index) => (
                <SwiperSlide key={index}>
                    {/* mediaItem */}
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default MediaSlide;