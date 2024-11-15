import qs from "qs";

export const profilequery = qs.stringify({
    populate: {
        image : {
            fields : ["url", "alternativeText"]
        }
    }
});